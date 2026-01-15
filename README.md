# 👥 User Management API

> RESTful API for managing users with full CRUD operations


## 🚀 Live Demo

- **API Base URL**: `https://api-mern-crud-eight.vercel.app/`
- **API Status**: [https://api-mern-crud-eight.vercel.app/health](https://api-mern-crud-eight.vercel.app/health)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Request & Response Examples](#request--response-examples)
- [Error Handling](#error-handling)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
---

## ✨ Features

- ✅ **CRUD Operations** - Create, Read, Update, Delete users
- ✅ **Pagination** - Efficient data loading with page & limit
- ✅ **Input Validation** - Joi schema validation
- ✅ **Type Safety** - Full TypeScript implementation
- ✅ **Database ORM** - Prisma for type-safe database access
- ✅ **Error Handling** - Comprehensive error responses
- ✅ **CORS Enabled** - Cross-origin resource sharing
- ✅ **Serverless Ready** - Deployed on Vercel

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | Runtime environment |
| **TypeScript** | 5.9 | Type-safe development |
| **Express** | 4.22 | Web framework |
| **Prisma** | 6.0 | Database ORM |
| **PostgreSQL** | - | Database |
| **Joi** | Latest | Validation |
| **Vercel** | - | Serverless deployment |

---

## 🚀 Getting Started

### Prerequisites
```bash
node >= 18.0.0
npm >= 9.0.0
postgresql >= 17
```

### Installation
```bash
# 1. Clone repository
git clone https://github.com/fakhri-muzakki/movie-app-by-fakhri.git

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# Edit .env with your database credentials

# 4. Generate Prisma Client
npx prisma generate

# 5. Run database migrations
npx prisma migrate dev

# 6. Start development server
npm run dev
or
vercel dev
```

Server will run on **`http://localhost:3000`**

### Quick Test
```bash
# Check API health
curl http://localhost:3000/health

# Get users
curl http://localhost:3000/api/users
```

---

## 📡 API Endpoints

### Base URL
```
Production: https://api-book-store.vercel.app
Local:      http://localhost:3000
```

### Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/api/users` | Get all users (with pagination) |
| `GET` | `/api/users/:id` | Get user by ID |
| `POST` | `/api/users` | Create new user |
| `PUT` | `/api/users/:id` | Update user |
| `DELETE` | `/api/users/:id` | Delete user |

---

## 📝 Request & Response Examples

### 1. Health Check

Check if API is running properly.

#### Request
```http
GET /health
```

#### Response
```json
{
  "status": "success",
  "message": "API is running",
  "timestamp": "2026-01-15T10:30:00.000Z",
  "environment": "production"
}
```

---

### 2. Get All Users

Retrieve a paginated list of users.

#### Request
```http
GET /api/users?page=1&limit=5
```

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | `1` | Page number |
| `limit` | number | `10` | Items per page |

#### Response
```json
{
  "success": true,
  "message": "Get user successfully",
  "data": [
    {
      "id": "cmkex27ak0000wbvondfassx7",
      "email": "ocamcs@gmail.com",
      "name": "ocam cs",
      "gender": "MALE",
      "createdAt": "2026-01-15T03:55:13.388Z",
      "updatedAt": "2026-01-15T04:10:42.777Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 5,
    "total": 4,
    "totalPages": 1
  }
}
```

#### cURL Example
```bash
curl -X GET "https://api-book-store.vercel.app/api/users?page=1&limit=5"
```

---

### 3. Create User

Create a new user.

#### Request
```http
POST /api/users
Content-Type: application/json
```

#### Request Body
```json
{
  "name": "yanto",
  "email": "yanto@gmail.com",
  "gender": "MALE"
}
```

#### Body Parameters

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `name` | string | ✅ Yes | Min: 3, Max: 50 characters |
| `email` | string | ✅ Yes | Valid email format, unique |
| `gender` | string | ✅ Yes | Enum: `MALE` or `FEMALE` |

#### Response
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "cmkey687n0000wb6wb6h5y1i2",
    "email": "yantao@gmail.com",
    "name": "yanto",
    "gender": "MALE",
    "createdAt": "2026-01-15T04:26:20.819Z",
    "updatedAt": "2026-01-15T04:26:20.819Z"
  }
}
```

#### cURL Example
```bash
curl -X POST "https://api-book-store.vercel.app/api/users" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "yanto",
    "email": "yantao@gmail.com",
    "gender": "MALE"
  }'
```

---

### 4. Update User

Update an existing user's information.

#### Request
```http
PUT /api/users/:id
Content-Type: application/json
```

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | ✅ Yes | User ID (UUID) |

#### Request Body
```json
{
  "name": "ocam cs",
  "email": "ocamcs@gmail.com",
  "gender": "MALE"
}
```

#### Body Parameters

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `name` | string | ⚠️ Optional | Min: 3, Max: 50 characters |
| `email` | string | ⚠️ Optional | Valid email format, unique |
| `gender` | string | ⚠️ Optional | Enum: `MALE` or `FEMALE` |

> **Note:** All fields are optional. Only provided fields will be updated.

#### Response
```json
{
  "success": true,
  "message": "Update user successfully",
  "data": {
    "id": "cmkex27ak0000wbvondfassx7",
    "email": "ocamcs@gmail.com",
    "name": "ocam cs",
    "gender": "MALE",
    "createdAt": "2026-01-15T03:55:13.388Z",
    "updatedAt": "2026-01-15T04:10:42.777Z"
  }
}
```

#### cURL Example
```bash
curl -X PUT "https://api-book-store.vercel.app/api/users/cmkex27ak0000wbvondfassx7" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ocam cs",
    "email": "ocamcs@gmail.com"
  }'
```

---

### 5. Delete User

Delete a user permanently.

#### Request
```http
DELETE /api/users/:id
```

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | ✅ Yes | User ID (UUID) |

#### Response
```json
{
  "success": true,
  "message": "Delete user successfully"
}
```

#### cURL Example
```bash
curl -X DELETE "https://api-book-store.vercel.app/api/users/cmkex27ak0000wbvondfassx7"
```

---

## ⚠️ Error Handling

All errors follow a consistent format:

### Error Response Structure
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error 1", "Detailed error 2"]
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| `200` | Success |
| `201` | Created |
| `400` | Bad Request (validation error) |
| `404` | Not Found |
| `409` | Conflict (duplicate email) |
| `500` | Internal Server Error |

### Common Error Examples

#### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    "\"name\" is required",
    "\"email\" must be a valid email",
    "\"gender\" must be one of [MALE, FEMALE]"
  ]
}
```

#### User Not Found (404)
```json
{
  "success": false,
  "message": "User not found"
}
```

#### Duplicate Email (409)
```json
{
  "success": false,
  "message": "Email already exists"
}
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory:
```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database (PostgreSQL)
DATABASE_URL=postgresql://username:password@localhost:5432/user_management_db

# Direct URL (for migrations)
DIRECT_URL=postgresql://username:password@localhost:5432/user_management_db

# CORS (comma-separated origins)
ALLOWED_ORIGINS=http://localhost:3000,https://your-frontend.vercel.app
```

### Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` / `production` |
| `PORT` | Server port | `3000` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `DIRECT_URL` | Direct database URL (for migrations) | Same as `DATABASE_URL` |
| `ALLOWED_ORIGINS` | CORS allowed origins | `http://localhost:3000` |

> **Security Note:** Never commit `.env` file to version control!

---

## 📦 Project Structure
```
user-management-api/
├── api/
│   └── index.ts              # Vercel serverless entry point
├── src/
│   ├── controllers/
│   │   └── user.controller.ts
│   ├── routes/
│   │   └── user.route.ts
│   ├── services/
│   │   └── user.service.ts
│   ├── validations/
│   │   └── user.validation.ts
│   ├── middlewares/
│   │   ├── errorHandler.ts
│   │   └── validate.ts
│   ├── types/
│   │   ├── user.types.ts
│   │   └── express-helpers.ts
│   ├── libs/
│   │   └── prisma.ts
│   ├── utils/
│   ├── app.ts                # Express app configuration
│   └── server.ts             # Local development server
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── migrations/           # Migration files
├── .env.example              # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json
├── vercel.json               # Vercel configuration
└── README.md
```

---

## 🚀 Deployment

### Deploy to Vercel

#### Prerequisites
- GitHub account
- Vercel account (free)
- PostgreSQL database (Neon, Supabase, or Railway)

#### Steps

1. **Push to GitHub**
```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Framework Preset: **Other**

3. **Configure Environment Variables**
   - Add all variables from `.env.example`
   - Set `NODE_ENV=production`
   - Set `DATABASE_URL` to your cloud database

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your API is live! 🎉

#### Post-Deployment
```bash
# Run migrations on production database
DATABASE_URL="your-production-url" npx prisma migrate deploy

# Test production API
curl https://your-api.vercel.app/health
```

### Manual Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## 🧪 Testing

### Test Locally
```bash
# Start server
npm run dev

# Test health endpoint
curl http://localhost:3000/health

# Test get users
curl http://localhost:3000/api/users

# Test create user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","gender":"MALE"}'
```

### Test with Postman

1. Import the API endpoints
2. Set base URL variable: `{{baseUrl}}`
3. Test all CRUD operations

---

## 📊 Database Schema

### User Model
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  gender    Gender
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Gender {
  MALE
  FEMALE
}
```

---

## 👤 Author

**Your Name**
- GitHub: [@fakhri-muzakki](https://github.com/fakhri-muzakki/)
- LinkedIn: [Fakhri Muzakki](https://www.linkedin.com/in/fakhrimuzakki/)
- Email: fakhrimuzakki119@gmail.com

