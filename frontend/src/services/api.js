import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Student API calls
export const studentAPI = {
  // Create a new student
  createStudent: (data) => api.post('/students', data),

  // Get all students with pagination
  getAllStudents: (page = 1, limit = 10) =>
    api.get('/students', { params: { page, limit } }),

  // Search students
  searchStudents: (searchTerm, page = 1, limit = 10) =>
    api.get('/students/search', {
      params: { search: searchTerm, page, limit },
    }),

  // Get student by ID with marks
  getStudentById: (id) => api.get(`/students/${id}`),

  // Update student
  updateStudent: (id, data) => api.put(`/students/${id}`, data),

  // Delete student
  deleteStudent: (id) => api.delete(`/students/${id}`),
};

// Mark API calls
export const markAPI = {
  // Create a new mark
  createMark: (data) => api.post('/marks', data),

  // Get all marks with pagination
  getAllMarks: (page = 1, limit = 10) =>
    api.get('/marks', { params: { page, limit } }),

  // Get marks by student ID
  getMarksByStudentId: (studentId) => api.get(`/marks/student/${studentId}`),

  // Update mark
  updateMark: (id, data) => api.put(`/marks/${id}`, data),

  // Delete mark
  deleteMark: (id) => api.delete(`/marks/${id}`),
};

export default api;
