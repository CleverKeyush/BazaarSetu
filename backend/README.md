# Marketplace Backend API

## Phase 2: Authentication System

### Features Implemented:
- User registration with role-based signup (vendor/supplier)
- User login with JWT authentication
- Protected routes with token verification
- Password hashing with bcryptjs
- CORS enabled for frontend integration

### API Endpoints:

#### Authentication Routes (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `GET /me` - Get current user (protected)

### Running the Backend:

```bash
cd backend
npm install
npm run dev
```

The API will run on http://localhost:5000

### Environment Variables:
Create a `.env` file with:
```
PORT=5000
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

### Request Examples:

#### Register:
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "userType": "vendor",
  "company": "Tech Corp"
}
```

#### Login:
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123",
  "userType": "vendor"
}
```

### Response Format:
```json
{
  "message": "Login successful",
  "user": {
    "id": "1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "userType": "vendor",
    "company": "Tech Corp"
  },
  "token": "jwt-token-here"
}
```