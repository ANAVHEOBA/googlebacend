import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Admin } from './modules/admin/admin.schema';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database';

const initializeAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email: 'wisdomabraham92@gmail.com' });
        
        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        // Create admin user
        const admin = new Admin({
            email: 'wisdomabraham92@gmail.com',
            password: 'Abrisco@real17'
        });

        await admin.save();
        console.log('Admin user created successfully');

        process.exit(0);
    } catch (error) {
        console.error('Error initializing admin:', error);
        process.exit(1);
    }
};

initializeAdmin(); 