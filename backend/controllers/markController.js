const Mark = require('../models/Mark');

// Create a new mark
exports.createMark = async (req, res) => {
  try {
    const { studentId, subject, marks } = req.body;

    // Validate request
    if (!studentId || !subject || marks === undefined) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Student ID, subject, and marks are required',
      });
    }

    // Validate marks
    if (marks < 0 || marks > 100) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Marks must be between 0 and 100',
      });
    }

    const mark = await Mark.create(studentId, subject, marks);
    res.status(201).json({
      message: 'Mark created successfully',
      data: mark,
    });
  } catch (error) {
    console.error('Error creating mark:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};

// Get marks by student ID
exports.getMarksByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;

    const marks = await Mark.getByStudentId(studentId);
    res.status(200).json({
      message: 'Marks retrieved successfully',
      data: marks,
    });
  } catch (error) {
    console.error('Error fetching marks:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};

// Get all marks with pagination
exports.getAllMarks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (page < 1 || limit < 1) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Page and limit must be greater than 0',
      });
    }

    const result = await Mark.getAll(page, limit);
    res.status(200).json({
      message: 'Marks retrieved successfully',
      data: result.data,
      pagination: {
        page: result.page,
        limit: result.limit,
        totalCount: result.totalCount,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching marks:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};

// Update mark
exports.updateMark = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, marks } = req.body;

    if (!subject || marks === undefined) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Subject and marks are required',
      });
    }

    if (marks < 0 || marks > 100) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Marks must be between 0 and 100',
      });
    }

    const mark = await Mark.update(id, subject, marks);

    if (!mark) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Mark not found',
      });
    }

    res.status(200).json({
      message: 'Mark updated successfully',
      data: mark,
    });
  } catch (error) {
    console.error('Error updating mark:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};

// Delete mark
exports.deleteMark = async (req, res) => {
  try {
    const { id } = req.params;

    const mark = await Mark.delete(id);

    if (!mark) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Mark not found',
      });
    }

    res.status(200).json({
      message: 'Mark deleted successfully',
      data: mark,
    });
  } catch (error) {
    console.error('Error deleting mark:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};
