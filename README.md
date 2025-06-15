# Google Backend API

A Node.js backend API built with Express and TypeScript, featuring user and admin authentication.

## Features

- User authentication with JWT
- Admin authentication and management
- Email notifications for admin
- User management endpoints
- MongoDB database integration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd googlebacend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password
```

4. Initialize admin user:
```bash
npm run init-admin
```

## Running the Application

Development mode:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

## API Endpoints

### User Endpoints
- `POST /api/users/login` - User login

### Admin Endpoints
- `POST /api/admin/login` - Admin login
- `GET /api/admin/users` - Get all users
- `GET /api/admin/stats` - Get user statistics
- `DELETE /api/admin/users/:userId` - Delete a user
- `PATCH /api/admin/users/:userId/password` - Update user password
- `GET /api/admin/users/search` - Search users

## Security

- Passwords are hashed using bcrypt
- JWT authentication for protected routes
- Admin-only access to sensitive endpoints

## License

ISC 