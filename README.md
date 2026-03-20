# Student Management System

A full-stack web application for managing student records and their academic marks. Built with Node.js, Express, PostgreSQL, and React.

## 🚀 Features

### Backend (Node.js + Express + PostgreSQL)

- **RESTful API** for student and marks management
- **CRUD Operations** for students and marks
- **Pagination** support for large datasets
- **Search functionality** by name or email
- **Input validation** and error handling
- **PostgreSQL database** with proper relationships

### Frontend (React + Bootstrap)

- **Responsive UI** with Bootstrap styling
- **Student Management**: Add, edit, delete, and view students
- **Marks Management**: View, add, edit, and delete marks per student
- **Search & Pagination**: Efficient data browsing
- **Modal-based forms** for better UX

## 🛠️ Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **pg (node-postgres)** - PostgreSQL client
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend

- **React** - UI library
- **React Bootstrap** - UI components
- **Axios** - HTTP client
- **SweetAlert2** - Alert dialogs

## 📁 Project Structure

```
nadsoft-assignement/
├── backend/                 # Node.js API server
│   ├── config/
│   │   └── database.js      # Database configuration
│   ├── controllers/
│   │   ├── studentController.js
│   │   └── markController.js
│   ├── models/
│   │   ├── Student.js
│   │   └── Mark.js
│   ├── routes/
│   │   └── studentRoutes.js
│   ├── .env                 # Environment variables (not committed)
│   ├── .env.example         # Environment template
│   ├── package.json
│   └── server.js
├── frontend/                # React application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── StudentList.js
│   │   │   ├── StudentForm.js
│   │   │   └── StudentDetailsModal.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── database/
│   └── schema.sql           # Database schema
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/student-management-system.git
   cd student-management-system
   ```

2. **Setup Backend**

   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your database credentials
   npm start
   ```

3. **Setup Frontend** (in new terminal)

   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Database Setup**
   - Create a PostgreSQL database
   - Run the schema from `database/schema.sql`

## 🔧 Configuration

### Environment Variables (Backend)

Create a `.env` file in the `backend/` directory:

```env
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=student_management
DB_USER=your_db_user
DB_PASSWORD=your_db_password
```

### Database Schema

The application uses two main tables:

- **students**: Stores student information (id, name, email, age)
- **marks**: Stores academic marks linked to students (id, student_id, subject, marks)

## 📡 API Endpoints

### Students

- `GET /api/students` - Get all students (with pagination)
- `GET /api/students/search` - Search students
- `GET /api/students/:id` - Get student with marks
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Marks

- `GET /api/marks` - Get all marks (with pagination)
- `GET /api/marks/student/:studentId` - Get marks by student
- `POST /api/marks` - Create mark
- `PUT /api/marks/:id` - Update mark
- `DELETE /api/marks/:id` - Delete mark

### Health Check

- `GET /api/health` - API health status

## 🌐 Deployment

### Backend Deployment (Render)

1. Create PostgreSQL database on Render
2. Create Web Service on Render
3. Set environment variables in Render dashboard
4. Deploy from GitHub

### Frontend Deployment

1. Build the production version: `npm run build`
2. Deploy to any static hosting (Netlify, Vercel, etc.)
3. Update API base URL in `frontend/src/services/api.js`

## 🧪 Testing

### API Testing

Use the provided Postman collection: `Student_Management_API.postman_collection.json`

### Manual Testing

1. Start both backend and frontend
2. Add students through the UI
3. Add marks for students
4. Test search and pagination
5. Verify CRUD operations

## 📚 Documentation

- **API Documentation**: `API_DOCUMENTATION.md`
- **Setup Guide**: `SETUP_GUIDE.md`
- **Test Scenarios**: `TEST_SCENARIOS.md`
- **Deployment Guide**: `DEPLOYMENT_GUIDE.md`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Author

Built as part of a development assignment.

---

**Note**: This is a demonstration project. For production use, consider adding authentication, input sanitization, and additional security measures.
