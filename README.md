# Trademark Verification System

A full-stack MERN application for submitting and verifying trademarks.

## Features

- User Authentication (Register/Login)
- Submit Trademark Applications
- Admin Panel for Trademark Verification
- Image Upload Support
- Secure API Endpoints
- Responsive UI

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4 or higher)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=mongodb://localhost:27017/trademark_verification
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

## Running the Application

1. Start MongoDB service on your machine

2. Start the backend server:
```bash
cd backend
npm run dev
```

3. Start the frontend development server:
```bash
cd frontend
npm start
```

4. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### Trademarks
- POST /api/trademarks - Submit new trademark
- GET /api/trademarks/my-trademarks - Get user's trademarks
- GET /api/trademarks/all - Get all trademarks (admin only)
- PATCH /api/trademarks/:id/status - Update trademark status (admin only)

## Project Structure

```
trademark-verification/
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── App.js
└── .env
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
