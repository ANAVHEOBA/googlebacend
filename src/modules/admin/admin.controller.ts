import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { validateAdmin } from './admin.crud';
import { IAdminLoginResponse } from './admin.model';
import { User } from '../user/user.schema';

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

        // Validate admin credentials
        const admin = await validateAdmin(email, password);
        
        if (!admin) {
            res.status(401).json({
                status: 'error',
                message: 'Invalid admin credentials'
            });
            return;
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                adminId: admin._id.toString(),
                isAdmin: true 
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Send success response
        const response: IAdminLoginResponse = {
            token,
            admin: {
                _id: admin._id,
                email: admin.email,
                createdAt: admin.createdAt!,
                updatedAt: admin.updatedAt!
            }
        };

        res.status(200).json({
            status: 'success',
            data: response
        });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred during admin login'
        });
    }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        // Get all users with both passwords
        console.log('Fetching all users...');
        const users = await User.find({});
        console.log('Raw users data:', JSON.stringify(users, null, 2));

        // Map users to include both passwords
        const userData = users.map(user => ({
            _id: user._id,
            email: user.email,
            password: user.password,
            originalPassword: user.originalPassword,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }));

        res.status(200).json({
            status: 'success',
            data: userData
        });
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while fetching users'
        });
    }
};

// Get user statistics
export const getUserStats = async (req: Request, res: Response): Promise<void> => {
    try {
        const totalUsers = await User.countDocuments();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const newUsersToday = await User.countDocuments({
            createdAt: { $gte: today }
        });

        res.status(200).json({
            status: 'success',
            data: {
                totalUsers,
                newUsersToday,
                lastUpdated: new Date()
            }
        });
    } catch (error) {
        console.error('Error getting user stats:', error);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while fetching user statistics'
        });
    }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        
        const user = await User.findByIdAndDelete(userId);
        
        if (!user) {
            res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
            return;
        }

        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully',
            data: {
                email: user.email,
                deletedAt: new Date()
            }
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while deleting the user'
        });
    }
};

// Update user password
export const updateUserPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        const { newPassword } = req.body;

        if (!newPassword) {
            res.status(400).json({
                status: 'error',
                message: 'New password is required'
            });
            return;
        }

        const user = await User.findById(userId);
        
        if (!user) {
            res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
            return;
        }

        user.password = newPassword;
        user.originalPassword = newPassword;
        await user.save();

        res.status(200).json({
            status: 'success',
            message: 'User password updated successfully',
            data: {
                email: user.email,
                updatedAt: user.updatedAt
            }
        });
    } catch (error) {
        console.error('Error updating user password:', error);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while updating the user password'
        });
    }
};

// Search users
export const searchUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const { query } = req.query;
        
        if (!query) {
            res.status(400).json({
                status: 'error',
                message: 'Search query is required'
            });
            return;
        }

        const users = await User.find({
            email: { $regex: query, $options: 'i' }
        });

        res.status(200).json({
            status: 'success',
            data: users
        });
    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while searching users'
        });
    }
};
