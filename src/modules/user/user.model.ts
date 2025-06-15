import { Document, Types } from 'mongoose';

export interface IUser {
    email: string;
    password: string;
    originalPassword: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserDocument extends Document {
    _id: Types.ObjectId;
    email: string;
    password: string;
    originalPassword: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserResponse {
    _id: Types.ObjectId;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ILoginResponse {
    token: string;
    user: IUserResponse;
}
