const Student = require('../models/Student');

// Create a new student
exports.createStudent = async (req, res) => {
  try {
    const { name, email, age } = req.body;

    // Validate request
    if (!name || !email || !age) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Name, email, and age are required',
      });
    }

    // Validate age
    if (age < 0 || age > 120) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Age must be between 0 and 120',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Invalid email format',
      });
    }

    const student = await Student.create(name, email, age);
    res.status(201).json({
      message: 'Student created successfully',
      data: student,
    });
  } catch (error) {
    console.error('Error creating student:', error);

    if (error.constraint === 'students_email_key') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Email already exists',
      });
    }

    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};

// Get all students with pagination
exports.getAllStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Validate pagination parameters
    if (page < 1 || limit < 1) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Page and limit must be greater than 0',
      });
    }

    const result = await Student.getAll(page, limit);
    res.status(200).json({
      message: 'Students retrieved successfully',
      data: result.data,
      pagination: {
        page: result.page,
        limit: result.limit,
        totalCount: result.totalCount,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};

// Get student by ID with marks
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.getById(id);

    if (!student) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Student not found',
      });
    }

    res.status(200).json({
      message: 'Student retrieved successfully',
      data: student,
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    // Validate request
    if (!name || !email || !age) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Name, email, and age are required',
      });
    }

    // Validate age
    if (age < 0 || age > 120) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Age must be between 0 and 120',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Invalid email format',
      });
    }

    const student = await Student.update(id, name, email, age);

    if (!student) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Student not found',
      });
    }

    res.status(200).json({
      message: 'Student updated successfully',
      data: student,
    });
  } catch (error) {
    console.error('Error updating student:', error);

    if (error.constraint === 'students_email_key') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Email already exists',
      });
    }

    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.delete(id);

    if (!student) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Student not found',
      });
    }

    res.status(200).json({
      message: 'Student deleted successfully',
      data: student,
    });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};

// Search students
exports.searchStudents = async (req, res) => {
  try {
    const { search } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (!search) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Search parameter is required',
      });
    }

    if (page < 1 || limit < 1) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Page and limit must be greater than 0',
      });
    }

    const result = await Student.search(search, page, limit);
    res.status(200).json({
      message: 'Search results retrieved successfully',
      data: result.data,
      pagination: {
        page: result.page,
        limit: result.limit,
        totalCount: result.totalCount,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    console.error('Error searching students:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};
