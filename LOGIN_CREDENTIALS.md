# 🔐 Login Credentials - Test Accounts

## Demo Accounts

### 👤 Regular User Account
```
Email: demo@example.com
Password: demo123
Role: user
Credits: 1000
```

### 👤 Test User Account
```
Email: user@example.com
Password: user123
Role: user
Credits: 1000
```

### 👨‍💼 Admin Account
```
Email: admin@example.com
Password: admin123
Role: admin
Credits: 10000
```

---

## How to Login

### 1. Start Backend
```bash
cd ai-saas-production/backend
python simple_main.py
```

### 2. Start Frontend
```bash
cd ai-saas-production/frontend
npm run dev
```

### 3. Open Browser
```
http://localhost:5173/login
```

### 4. Enter Credentials
- Use any of the accounts above
- Click "Sign In"

---

## API Endpoints

### Register
```bash
POST http://localhost:8000/api/v1/auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "New User"
}
```

### Login
```bash
POST http://localhost:8000/api/v1/auth/login
Content-Type: application/json

{
  "email": "demo@example.com",
  "password": "demo123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_123",
      "email": "demo@example.com",
      "name": "Demo User",
      "credits": 1000,
      "role": "user",
      "created_at": "2024-01-01T00:00:00Z"
    },
    "token": "mock_token_demo@example.com"
  }
}
```

### Logout
```bash
POST http://localhost:8000/api/v1/auth/logout
```

### Get Current User
```bash
GET http://localhost:8000/api/v1/auth/me
Authorization: Bearer mock_token_demo@example.com
```

---

## Testing with cURL

### Test Login
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"demo@example.com\",\"password\":\"demo123\"}"
```

### Test Register
```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"test123\",\"name\":\"Test User\"}"
```

---

## Notes

- ✅ All passwords are stored in plain text (mock only)
- ✅ Tokens are simple mock tokens (not real JWT)
- ✅ No database - all data in memory
- ✅ Registration creates new users in memory
- ⚠️ Server restart clears all registered users
- ⚠️ Only pre-defined accounts persist

---

## Quick Test

1. **Login as Demo User**
   - Email: `demo@example.com`
   - Password: `demo123`
   - Expected: Success, redirected to dashboard

2. **Login as Admin**
   - Email: `admin@example.com`
   - Password: `admin123`
   - Expected: Success, admin panel access

3. **Register New User**
   - Email: `yourname@example.com`
   - Password: `yourpassword`
   - Expected: Success, auto-login

4. **Wrong Password**
   - Email: `demo@example.com`
   - Password: `wrongpassword`
   - Expected: Error "Invalid credentials"

---

**Created**: Now  
**Backend**: simple_main.py  
**Status**: ✅ Working
