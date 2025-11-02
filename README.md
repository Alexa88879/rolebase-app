# Rbac

Role-Based Access Control (RBAC) Web Application

A secure web application with user authentication, role-based access control, and admin controls.

## 🌐 Live Demo

**Firebase Deployment:** https://water-level-monitoring-818d3.web.app

## Features

- **User Authentication**: Secure login and logout functionality
- **Role-Based Access**: Two roles - Admin and Student
- **User Registration**: Students can self-register
- **Password Management**: Users can change their passwords
- **Admin Controls**: Admins can create, delete, and view all users
- **Security**: Password hashing with bcrypt, JWT-based authentication
- **Input Validation**: Client and server-side validation
- **Clean Architecture**: Separated backend and frontend

## Tech Stack

### Local Development
- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Frontend**: HTML, CSS, JavaScript

### Firebase Deployment
- **Hosting**: Firebase Hosting
- **Authentication**: Firebase Authentication
- **Database**: Cloud Firestore
- **Backend**: Firebase Cloud Functions
- **Deployment**: Fully deployed on Firebase platform

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd  rolebase-app
```

2. **Configure Environment Variables** (Important for Security):
```bash
cp .env.example .env
```
Then edit `.env` file with your actual Firebase credentials and JWT secret.

3. Install dependencies:
```bash
npm install
```

4. Start the server:
```bash
npm start
```

5. Open your browser and navigate to:
```
http://localhost:3000
```

## 🚀 Firebase Deployment

This application is **fully deployed on Firebase** with the following services:

- **🌐 Firebase Hosting**: Static web hosting with global CDN
- **🔐 Firebase Authentication**: User authentication and session management  
- **💾 Cloud Firestore**: NoSQL database for user data and roles
- **⚡ Real-time Updates**: Live data synchronization
- **🔒 Security Rules**: Server-side access control and validation

**Live URL**: https://water-level-monitoring-818d3.web.app

### Deployment Features:
- ✅ Automatic HTTPS
- ✅ Global CDN distribution
- ✅ Scalable cloud infrastructure
- ✅ Built-in security and authentication
- ✅ Real-time database updates

## Default Admin Credentials

When the application starts for the first time, a default admin account is created:

- **Username**: admin
- **Password**: admin123

**Important**: Change this password immediately after first login for security.

## 🔒 Security Configuration

### Environment Variables
This project uses environment variables to protect sensitive information:

- ❌ **Never commit** `.env` file to git
- ✅ **Always use** `.env.example` as template
- 🔑 **Required variables**:
  - `JWT_SECRET`: Secret key for JWT token signing
  - `FIREBASE_API_KEY`: Firebase project API key
  - `FIREBASE_PROJECT_ID`: Firebase project identifier
  - And other Firebase configuration values

### Security Features
- 🔐 Environment-based configuration
- 🚫 Sensitive data excluded from git
- 🛡️ JWT token authentication
- 🔒 Role-based access control
- 🔑 Password hashing with bcrypt

## Project Structure

```
Rbac/
├── backend/
│   ├── config/
│   │   └── database.js       # Database configuration
│   ├── middleware/
│   │   └── auth.js           # Authentication middleware
│   ├── models/
│   │   └── User.js           # User model
│   └── routes/
│       ├── auth.js           # Authentication routes
│       └── admin.js          # Admin routes
├── frontend/
│   ├── css/
│   │   └── style.css         # Styles
│   ├── js/
│   │   ├── login.js          # Login page logic
│   │   ├── register.js       # Registration page logic
│   │   ├── welcome.js        # Welcome page logic
│   │   ├── change-password.js # Change password logic
│   │   └── admin.js          # Admin panel logic
│   ├── index.html            # Home page
│   ├── login.html            # Login page
│   ├── register.html         # Registration page
│   ├── welcome.html          # Welcome page
│   ├── change-password.html  # Change password page
│   └── admin.html            # Admin panel
├── server.js                 # Main server file
├── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new student
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/change-password` - Change password (requires authentication)

### Admin (requires admin role)
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users` - Create a new user
- `DELETE /api/admin/users/:id` - Delete a user

## Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt before storage
2. **JWT Authentication**: Secure token-based authentication
3. **Input Validation**: Both client-side and server-side validation
4. **Role-Based Access Control**: Middleware to restrict access based on user role
5. **SQL Injection Prevention**: Using parameterized queries
6. **XSS Protection**: Input sanitization

## Usage

### For Students

1. **Register**: Go to the registration page and create an account
2. **Login**: Use your credentials to log in
3. **Welcome Page**: After login, you'll see your profile information
4. **Change Password**: Update your password from the welcome page

### For Admins

1. **Login**: Use admin credentials to log in
2. **Admin Panel**: Access the admin panel from the welcome page
3. **Create Users**: Create new users (both students and admins)
4. **View Users**: See all registered users
5. **Delete Users**: Remove users from the system

## Edge Cases Handled

- Duplicate username prevention
- Password strength validation
- Token expiration handling
- Invalid credentials handling
- Unauthorized access prevention
- Admin self-deletion prevention
- Empty input validation
- SQL injection protection

## Development

To run in development mode:
```bash
npm start
```

