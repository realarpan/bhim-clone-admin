# BHIM Clone App with Admin Panel

A full-stack web application that mimics BHIM (Bharat Interface for Money) payment app functionality with virtual money and an admin panel for managing users and transactions.

## Features

### User Features
- User Registration & Login
- OTP Verification
- Send Money to other users via UPI
- Receive Money from other users
- Transaction History
- Balance Management
- User Profile Management

### Admin Features
- Admin Login
- View all users and their UPI IDs
- View all transactions
- Increase/Decrease user balance
- Block/Unblock users
- Transaction monitoring and analytics

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB (Database)
- JWT Authentication
- Bcrypt for password hashing
- Nodemailer for email notifications

### Frontend
- React.js
- Tailwind CSS
- Redux for state management
- Axios for API calls

## Project Structure

```
bhim-clone-admin/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── App.js
│   └── package.json
└── README.md
```

## Installation & Setup

### Backend Setup
```bash
cd backend
npm install
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Default Credentials

### Admin Login
- Email: admin@bhim.com
- Password: admin123

## API Endpoints

See documentation in backend/API_DOCS.md

## License

MIT License
