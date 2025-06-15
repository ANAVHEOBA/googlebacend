import { Document, Types } from 'mongoose';

export interface IAdmin {
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IAdminDocument extends Document {
    _id: Types.ObjectId;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IAdminResponse {
    _id: Types.ObjectId;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IAdminLoginResponse {
    token: string;
    admin: IAdminResponse;
}