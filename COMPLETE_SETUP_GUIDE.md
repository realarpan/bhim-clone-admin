# Complete Setup Guide for BHEEM Clone Admin App

## Quick Start Instructions

This guide provides step-by-step instructions to set up the complete BHIM Clone application with admin panel.

## Prerequisites

- Node.js (v14+)
- MongoDB (local or MongoDB Atlas)
- Git
- npm or yarn package manager

## Backend Setup (Node.js + Express)

### Step 1: Backend Initial Setup

```bash
cd backend
npm install
```

### Step 2: Create .env file

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

### Step 3: Complete Route Files

Create the following files in `backend/routes/`:

#### `transactionRoutes.js`
- Import Transaction model and User model
- POST /send-money - Send money between users
- GET /history/:upiId - Get transaction history
- PUT /receive - Confirm received payment

#### `adminRoutes.js`
- GET /users - List all users (admin only)
- GET /users/:id - Get user details
- PUT /users/:id/balance - Update user balance
- DELETE /users/:id/block - Block user
- GET /transactions - View all transactions
- GET /analytics - Get transaction analytics

#### `userRoutes.js`
- GET /profile - Get user profile
- PUT /profile - Update user profile
- GET /balance - Get user balance

### Step 4: Create Middleware

Create `backend/middleware/auth.js` with JWT verification and admin check functions.

### Step 5: Start Backend

```bash
npm start
```

Backend will run on `http://localhost:5000`

## Frontend Setup (React)

### Step 1: Create React App

```bash
cd ..
npx create-react-app frontend
cd frontend
npm install axios react-router-dom redux @reduxjs/toolkit
```

### Step 2: Create Folder Structure

```
src/
├── components/
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── DashboardPage.jsx
│   ├── SendMoneyModal.jsx
│   ├── TransactionHistory.jsx
│   └── AdminDashboard.jsx
├── pages/
│   ├── HomePage.jsx
│   └── NotFound.jsx
├── redux/
│   ├── store.js
│   ├── userSlice.js
│   └── transactionSlice.js
├── services/
│   └── api.js
├── App.jsx
└── index.js
```

### Step 3: Create API Service

`src/services/api.js` - Axios instance with base URL and interceptors

### Step 4: Create Redux Store

Setup user and transaction state management

### Step 5: Create Pages and Components

#### Login Page
- Email/password fields
- Toggle for admin login
- Register link

#### Dashboard
- User balance display
- Send money button
- Transaction history table
- User profile

#### Admin Dashboard
- User management table
- Balance modification
- User blocking
- Transaction analytics
- Charts for transaction data

### Step 6: Start Frontend

```bash
npm start
```

Frontend will run on `http://localhost:3000`

## Default Credentials

### User Account
- Email: user@example.com
- Password: password123
- Initial Balance: ₹5000

### Admin Account
- Email: admin@bhim.com
- Password: admin123

## API Endpoints Summary

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user/admin
- `GET /api/auth/profile` - Get user profile

### Transactions
- `POST /api/transactions/send-money` - Send money
- `GET /api/transactions/history/:upiId` - Get transaction history
- `PUT /api/transactions/receive` - Confirm payment

### Admin
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/balance` - Update balance
- `POST /api/admin/users/:id/block` - Block user
- `GET /api/admin/transactions` - Get all transactions

## Features to Implement

### User Features
- [x] User registration and login
- [ ] Send money with OTP verification
- [ ] Transaction history
- [ ] User profile management
- [ ] Balance check
- [ ] Transaction notifications

### Admin Features
- [ ] User management (view/edit/block)
- [ ] Balance management (increase/decrease)
- [ ] Transaction monitoring
- [ ] Analytics and reports
- [ ] User blocking system

## Deployment

### Backend (Heroku)
```bash
heroku create bhim-clone-backend
git push heroku main
```

### Frontend (Vercel)
```bash
npm install -g vercel
vercel
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or check Atlas connection string
- Verify network access in MongoDB Atlas

### CORS Errors
- Add frontend URL to CORS whitelist in backend

### JWT Token Issues
- Check JWT_SECRET in .env matches frontend configuration
- Verify token is being sent in Authorization header

## Next Steps

1. Complete all route handlers
2. Implement OTP verification
3. Add transaction notifications
4. Create detailed transaction analytics
5. Add mobile responsiveness
6. Implement advanced security features

## Support

For issues, check the GitHub repository or create an issue.

## License

MIT License
