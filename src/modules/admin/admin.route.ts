import { Router, Request, Response, NextFunction } from 'express';
import { login, getAllUsers, getUserStats, deleteUser, updateUserPassword, searchUsers } from './admin.controller';
import { verifyAdminToken } from './admin.middleware';

const router = Router();

// Public routes
router.post('/login', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await login(req, res);
    } catch (error) {
        next(error);
    }
});

// Protected routes
router.get('/users', verifyAdminToken, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await getAllUsers(req, res);
    } catch (error) {
        next(error);
    }
});

router.get('/stats', verifyAdminToken, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await getUserStats(req, res);
    } catch (error) {
        next(error);
    }
});

router.delete('/users/:userId', verifyAdminToken, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await deleteUser(req, res);
    } catch (error) {
        next(error);
    }
});

router.patch('/users/:userId/password', verifyAdminToken, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await updateUserPassword(req, res);
    } catch (error) {
        next(error);
    }
});

router.get('/users/search', verifyAdminToken, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await searchUsers(req, res);
    } catch (error) {
        next(error);
    }
});

export default router;
