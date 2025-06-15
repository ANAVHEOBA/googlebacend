import { Router, Request, Response, NextFunction } from 'express';
import { login } from './user.controller';

const router = Router();

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await login(req, res);
    } catch (error) {
        next(error);
    }
});

export default router;
