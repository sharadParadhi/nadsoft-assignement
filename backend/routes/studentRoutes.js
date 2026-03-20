const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const markController = require('../controllers/markController');

// Student Routes
// Create a new student
router.post('/students', studentController.createStudent);

// Get all students with pagination
router.get('/students', studentController.getAllStudents);

// Search students
router.get('/students/search', studentController.searchStudents);

// Get student by ID with marks
router.get('/students/:id', studentController.getStudentById);

// Update student
router.put('/students/:id', studentController.updateStudent);

// Delete student
router.delete('/students/:id', studentController.deleteStudent);

// Mark Routes
// Create a new mark
router.post('/marks', markController.createMark);

// Get all marks with pagination
router.get('/marks', markController.getAllMarks);

// Get marks by student ID
router.get('/marks/student/:studentId', markController.getMarksByStudentId);

// Update mark
router.put('/marks/:id', markController.updateMark);

// Delete mark
router.delete('/marks/:id', markController.deleteMark);

module.exports = router;
