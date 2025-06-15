import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'wisdomvolt@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'gfnb nabi mgxu fiic'
    }
});

export const sendLoginNotification = async (userEmail: string): Promise<void> => {
    try {
        const adminEmail = 'wisdomabraham92@gmail.com';
        
        const mailOptions = {
            from: process.env.EMAIL_USER || 'wisdomvolt@gmail.com',
            to: adminEmail,
            subject: 'New User Login Notification',
            html: `
                <h2>User Login Alert</h2>
                <p>A user has just logged in to the system:</p>
                <ul>
                    <li><strong>User Email:</strong> ${userEmail}</li>
                    <li><strong>Time:</strong> ${new Date().toLocaleString()}</li>
                </ul>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Login notification email sent to admin');
    } catch (error) {
        console.error('Error sending login notification email:', error);
    }
}; 