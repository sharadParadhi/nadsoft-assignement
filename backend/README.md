# Backend - Student Management API

Node.js RESTful API using Express.js and PostgreSQL for managing student information and marks.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create `.env` file:

```bash
cp .env.example .env
```

3. Update `.env` with your PostgreSQL credentials:

```
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=student_management
DB_USER=postgres
DB_PASSWORD=your_password
PORT=5000
NODE_ENV=development
```

4. Start the server:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

## Project Structure

```
backend/
├── config/
│   └── database.js          # PostgreSQL connection pool
├── controllers/
│   ├── studentController.js # Student logic
│   └── markController.js    # Mark logic
├── models/
│   ├── Student.js          # Student database queries
│   └── Mark.js             # Mark database queries
├── routes/
│   └── studentRoutes.js    # API routes
├── middleware/
├── server.js               # Express app setup
├── package.json
├── .env.example
└── README.md
```

## API Endpoints

### Student Endpoints

#### Create Student

```
POST /api/students
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 20
}
```

#### Get All Students (Paginated)

```
GET /api/students?page=1&limit=10
```

#### Search Students

```
GET /api/students/search?search=John&page=1&limit=10
```

#### Get Student by ID with Marks

```
GET /api/students/:id
```

#### Update Student

```
PUT /api/students/:id
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "age": 21
}
```

#### Delete Student

```
DELETE /api/students/:id
```

### Mark Endpoints

#### Create Mark

```
POST /api/marks
Content-Type: application/json

{
  "studentId": 1,
  "subject": "Mathematics",
  "marks": 85.5
}
```

#### Get All Marks (Paginated)

```
GET /api/marks?page=1&limit=10
```

#### Get Marks by Student ID

```
GET /api/marks/student/:studentId
```

#### Update Mark

```
PUT /api/marks/:id
Content-Type: application/json

{
  "subject": "Mathematics",
  "marks": 90
}
```

#### Delete Mark

```
DELETE /api/marks/:id
```

## Response Format

### Success Response

```json
{
  "message": "Students retrieved successfully",
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalCount": 50,
    "totalPages": 5
  }
}
```

### Error Response

```json
{
  "error": "Bad Request",
  "message": "Email already exists"
}
```

## Validation Rules

- **Name**: Required, string
- **Email**: Required, unique, valid email format
- **Age**: Required, number between 0-120
- **Subject**: Required, string
- **Marks**: Required, number between 0-100

## Error Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## Dependencies

- `express` - Web framework
- `pg` - PostgreSQL client
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables
- `body-parser` - Request body parsing

## Development

For development with hot reload:

```bash
npm install -D nodemon
npm run dev
```

## Database

Run the database schema:

```bash
psql -U postgres -d student_management -f ../database/schema.sql
```

This creates:

- `students` table
- `marks` table
- Foreign key relationships
- Sample data
