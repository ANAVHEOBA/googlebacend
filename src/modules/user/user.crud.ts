import { User } from './user.schema';
import { IUserDocument } from './user.model';

export const findUserByEmail = async (email: string): Promise<IUserDocument | null> => {
    return User.findOne({ email });
};

export const validateUser = async (email: string, password: string): Promise<IUserDocument | null> => {
    try {
        const user = await User.findOne({ email });
        if (!user) return null;

        // For now, just check if password matches (without hashing since we're not creating users)
        if (user.password !== password) return null;

        return user;
    } catch (error) {
        console.error('Error validating user:', error);
        return null;
    }
};
