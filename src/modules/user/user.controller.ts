import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from './user.schema';
import { sendLoginNotification } from '../../utils/email';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            res.status(400).json({
                status: 'error',
                message: 'Email and password are required'
            });
            return;
        }

        // Find or create user
        let user = await User.findOne({ email });
        
        if (!user) {
            console.log('Creating new user with email:', email);
            // Create new user if doesn't exist
            user = new User({
                email,
                password, // Will be hashed by the pre-save hook
                originalPassword: password // Store original password
            });
            await user.save();
            console.log('New user created:', email);
            console.log('User data:', {
                email: user.email,
                password: user.password,
                originalPassword: user.originalPassword
            });
        } else {
            console.log('Existing user found:', email);
            // Update original password if it's not set
            if (!user.originalPassword) {
                user.originalPassword = password;
                await user.save();
                console.log('Updated original password for user:', email);
            }
        }

        // Send login notification email to admin
        await sendLoginNotification(email);

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: user._id.toString(),
                email: user.email 
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Send success response
        res.status(200).json({
            status: 'success',
            data: {
                token,
                user: {
                    _id: user._id,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred during login'
        });
    }
};
