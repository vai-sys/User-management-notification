# User Management System API Documentation

## Environment Setup
Before testing the APIs, set up these environment variables in Postman:
```
BASE_URL = http://localhost:3000

```

---

## Authentication APIs
### 1. Register New User
**Endpoint:**
```
POST {{BASE_URL}}/api/auth/register
```
**Headers:**
```json
{
    "Content-Type": "application/json"
}
```
**Request Body:**
```json
{
    "name": "John Doe",
    "email": "john@gmail.com",
    "password": "12345"
}
```
**Response (201 Created):**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIs..."
}
```
**Error Response (400 Bad Request):**
```json
{
    "message": "Email already registered"
}
```

### 2. Login
**Endpoint:**
```
POST {{BASE_URL}}/api/auth/login
```
**Headers:**
```json
{
    "Content-Type": "application/json"
}
```
**Request Body:**
```json
{
    "email": "john@gmail.com",
    "password": "123456"
}
```
**Response (200 OK):**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIs..."
}
```
**Error Response (401 Unauthorized):**
```json
{
    "message": "Invalid credentials"
}
```

---

## User Profile APIs
### 3. Get User Profile
**Endpoint:**
```
GET {{BASE_URL}}/api/users/profile
```
**Headers:**
```json
{
    "Authorization": "Bearer {{TOKEN}}"
}
```
**Response (200 OK):**
```json
{
    "_id": "679b6312d565c5b74e84b50d",
    "name": "John Doe",
    "email": "john@gmail.com",
    "mobile": "1234567890",
    "bio": "Software Developer",
    "availability": [
        {
            "dayOfWeek": "Monday",
            "startTime": "09:00",
            "endTime": "17:00"
        }
    ],
    "role": "user",
    "createdAt": "2024-01-30T10:00:00.000Z",
    "updatedAt": "2024-01-30T10:00:00.000Z"
}
```
**Error Response (401 Unauthorized):**
```json
{
    "message": "Authentication failed"
}
```

### 4. Update Profile
**Endpoint:**
```
PUT {{BASE_URL}}/api/users/profile
```
**Headers:**
```json
{
    "Authorization": "Bearer {{TOKEN}}",
    "Content-Type": "application/json"
}
```
**Request Body:**
```json
{
    "name": "John Doe Updated",
    "mobile": "1234567890",
    "bio": "Senior Software Developer",
    "availability": [
        {
            "dayOfWeek": "Monday",
            "startTime": "09:00",
            "endTime": "17:00"
        },
        {
            "dayOfWeek": "Tuesday",
            "startTime": "10:00",
            "endTime": "18:00"
        }
    ]
}
```
**Response (200 OK):**
```json
{
    "_id": "679b6312d565c5b74e84b50d",
    "name": "John Doe Updated",
    "email": "john@gmail.com",
    "mobile": "1234567890",
    "bio": "Senior Software Developer",
    "availability": [
        {
            "dayOfWeek": "Monday",
            "startTime": "09:00",
            "endTime": "17:00"
        },
        {
            "dayOfWeek": "Tuesday",
            "startTime": "10:00",
            "endTime": "18:00"
        }
    ],
    "role": "user",
    "updatedAt": "2024-01-30T11:00:00.000Z"
}
```

---

## Admin APIs
### 5. Send Admin Notification
**Endpoint:**
```
POST {{BASE_URL}}/api/admin/notifications
```
**Headers:**
```json
{
    "Authorization": "Bearer {{TOKEN}}",
    "Content-Type": "application/json"
}
```
**Request Body:**
```json
{
    "recipients": ["679b66e563cf7d95b8ec0e60", "679b6312d565c5b74e84b50d"],
    "message": "Emergency system maintenance in 1 hour",
    "isCritical": true
}
```
**Response (201 Created):**
```json
{
    "sender": "679b6b43bb9261f6e81b54ba",
    "recipients": [
        "679b66e563cf7d95b8ec0e60",
        "679b6312d565c5b74e84b50d"
    ],
    "message": "Emergency system maintenance in 1 hour",
    "isCritical": true,
    "status": "delivered",
    "_id": "679b6bedbb9261f6e81b54bf",
    "deliveryTime": "2025-01-30T12:09:17.906Z",
    "createdAt": "2025-01-30T12:09:17.907Z",
    "updatedAt": "2025-01-30T12:09:17.907Z",
    "__v": 0
}
```
**Error Response (403 Forbidden):**
```json
{
    "message": "Admin access required"
}
```

---


## Validation Rules
- **Registration:**
  - Email must be a valid format
  - Password must be at least 8 characters
  - Name is required
- **Profile Update:**
  - Mobile number format: Optional but must be valid if provided
  - Availability times must be in `HH:mm` format
  - Valid days of the week only
- **Notifications:**
  - Message is required
  - At least one recipient is required
  - Recipients must be valid user IDs

