import { Admin } from './admin.schema';
import { IAdmin, IAdminDocument } from './admin.model';

export const findAdminByEmail = async (email: string): Promise<IAdminDocument | null> => {
    return Admin.findOne({ email });
};

export const createAdmin = async (adminData: IAdmin): Promise<IAdminDocument> => {
    const admin = new Admin(adminData);
    return admin.save();
};

export const validateAdmin = async (email: string, password: string): Promise<IAdminDocument | null> => {
    const admin = await findAdminByEmail(email);
    if (!admin) return null;

    const isValid = await admin.comparePassword(password);
    if (!isValid) return null;

    return admin;
};
