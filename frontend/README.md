# Frontend - Student Management System

React.js application with Bootstrap UI for managing student records.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

The application will open at `http://localhost:3000`

## Features

- **Student List**: Display all students with pagination
- **Search**: Search students by name or email
- **Add Student**: Modal form to add new students
- **Edit Student**: Update existing student information
- **Delete Student**: Remove students with confirmation
- **Pagination**: Navigate through paginated student list
- **SweetAlerts**: User-friendly notifications for operations

## Project Structure

```
frontend/
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── components/
│   │   ├── StudentList.js  # Student list component
│   │   └── StudentForm.js  # Add/Edit form component
│   ├── services/
│   │   └── api.js          # API service with axios
│   ├── App.js              # Main component
│   ├── App.css             # App styles
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── package.json
└── README.md
```

## Components

### StudentList

Main component displaying:

- Search input field (left corner)
- Add Student button (right corner)
- Student data table with pagination
- Edit and Delete action buttons
- Pagination controls

Props: None (works independently)

### StudentForm

Modal form for adding/editing students with:

- Name field
- Email field
- Age field
- Member ID (auto-generated/read-only)
- Submit button

Props:

- `show`: Boolean to show/hide modal
- `handleClose`: Callback to close modal
- `onStudentSaved`: Callback after student saved
- `editingStudent`: Student object if editing (null for new)

## API Service

Located in `src/services/api.js`, provides methods:

**Student API:**

- `createStudent(data)` - Create new student
- `getAllStudents(page, limit)` - Get paginated students
- `searchStudents(term, page, limit)` - Search students
- `getStudentById(id)` - Get single student with marks
- `updateStudent(id, data)` - Update student
- `deleteStudent(id)` - Delete student

**Mark API:**

- `createMark(data)` - Create new mark
- `getAllMarks(page, limit)` - Get paginated marks
- `getMarksByStudentId(id)` - Get student marks
- `updateMark(id, data)` - Update mark
- `deleteMark(id)` - Delete mark

## Configuration

Update the API base URL in `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

## Dependencies

- `react` - UI library
- `react-dom` - React DOM rendering
- `axios` - HTTP client
- `bootstrap` - CSS framework
- `react-bootstrap` - Bootstrap components
- `sweetalert2` - Alert dialogs

## Available Scripts

### `npm start`

Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm build`

Builds the app for production.

### `npm test`

Runs the test suite.

## Features

### Student Management

- View all students with pagination
- Search students by name or email
- Create new student records
- Edit existing student information
- Delete student records
- View student details with marks

### User Experience

- Modal forms for adding/editing
- SweetAlert notifications
- Confirmation dialogs for deletion
- Responsive Bootstrap design
- Loading states
- Error handling

### Validation

- Required field validation
- Email format validation
- Age range validation
- Server-side error messages

## Styling

- Bootstrap 5 for responsive design
- Custom CSS in `App.css`
- React-Bootstrap components
- Responsive table layout
- Mobile-friendly pagination

## Notes

- Ensure the backend API is running on `http://localhost:5000`
- The search function works with pagination
- Pagination updates when changing pages or searching
- All operations show appropriate feedback messages

## Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build` folder.
