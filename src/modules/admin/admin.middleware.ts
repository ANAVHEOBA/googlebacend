import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const verifyAdminToken = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                status: 'error',
                message: 'No token provided'
            });
            return;
        }

        const token = authHeader.split(' ')[1];
        
        const decoded = jwt.verify(token, JWT_SECRET) as { isAdmin: boolean };
        
        if (!decoded.isAdmin) {
            res.status(403).json({
                status: 'error',
                message: 'Not authorized as admin'
            });
            return;
        }

        next();
    } catch (error) {
        res.status(401).json({
            status: 'error',
            message: 'Invalid token'
        });
    }
}; 