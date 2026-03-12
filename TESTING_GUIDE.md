# Trademark Verification System - Testing Guide

## Prerequisites
1. Install MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Install Node.js from https://nodejs.org (LTS version)
3. Install a code editor (VS Code recommended)

## Setup Steps

### 1. Start MongoDB
```bash
# Windows
1. Open Services (Windows + R, type "services.msc")
2. Find "MongoDB" service
3. Right-click and select "Start"
4. Set Startup type to "Automatic"
```

### 2. Start Backend Server
```bash
cd backend
npm install
npm run dev

# Expected output:
# Server running on port 5000
# MongoDB Connected: 127.0.0.1
```

### 3. Start Frontend Server
```bash
cd frontend
npm install
npm start

# Browser should automatically open to http://localhost:3000
```

## Testing Flow

### 1. User Registration
- Navigate to http://localhost:3000/register
- Fill in the registration form:
  - Username: testuser
  - Email: test@example.com
  - Password: test123
  - Confirm Password: test123
- Click "Register"
- You should be redirected to the dashboard

### 2. User Login
- Navigate to http://localhost:3000/login
- Enter credentials:
  - Email: test@example.com
  - Password: test123
- Click "Login"
- Verify you can access the dashboard

### 3. Submit Trademark
- Click "Submit Trademark" in navigation
- Fill in the form:
  - Trademark Name: Test Brand
  - Description: A test trademark submission
  - Category: Logo
  - Upload an image file (PNG/JPG)
- Click "Submit Trademark"
- Verify the trademark appears in your dashboard

### 4. Admin Access
- Register a new admin user:
```bash
# Use MongoDB Compass or mongo shell:
use trademark_verification
db.users.updateOne(
  { email: "test@example.com" },
  { $set: { role: "admin" } }
)
```
- Login with admin credentials
- Navigate to Admin Panel
- Verify you can see all submitted trademarks
- Test approval/rejection functionality

## Common Issues & Solutions

### MongoDB Connection Issues
1. Check if MongoDB is running:
```bash
# Windows
tasklist /fi "imagename eq mongod.exe"
```

2. Verify MongoDB URI in .env:
```
MONGODB_URI=mongodb://127.0.0.1:27017/trademark_verification?directConnection=true
```

### Image Upload Issues
1. Check if uploads directory exists:
```bash
# In backend folder
mkdir uploads
```

2. Verify file permissions:
- Ensure the application has write permissions to the uploads directory

### Authentication Issues
1. Clear browser storage:
- Open DevTools (F12)
- Go to Application > Storage
- Clear Site Data

2. Verify JWT token:
- Check browser console for any token-related errors
- Ensure JWT_SECRET is properly set in .env

## Testing Checklist

### User Features
- [ ] Registration with validation
- [ ] Login with proper error messages
- [ ] Password hashing verification
- [ ] Protected route access
- [ ] Trademark submission
- [ ] Image upload functionality
- [ ] View submitted trademarks

### Admin Features
- [ ] Access control verification
- [ ] View all trademarks
- [ ] Approval process
- [ ] Rejection with feedback
- [ ] Similarity score assignment

### Security
- [ ] JWT token validation
- [ ] Protected route enforcement
- [ ] File upload restrictions
- [ ] Input validation
- [ ] Error handling

## Need Help?

If you encounter any issues:
1. Check the console logs (both frontend and backend)
2. Verify environment variables
3. Ensure all dependencies are installed
4. Check MongoDB connection status
5. Verify file permissions

For additional support, refer to:
- MongoDB documentation: https://docs.mongodb.com/
- React documentation: https://reactjs.org/docs
- Express documentation: https://expressjs.com/
