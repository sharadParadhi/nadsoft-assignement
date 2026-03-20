const pool = require('../config/database');

class Mark {
  // Create a new mark
  static async create(studentId, subject, marks) {
    const query =
      'INSERT INTO marks (student_id, subject, marks) VALUES ($1, $2, $3) RETURNING *';
    try {
      const result = await pool.query(query, [studentId, subject, marks]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Get marks by student ID
  static async getByStudentId(studentId) {
    const query = 'SELECT * FROM marks WHERE student_id = $1 ORDER BY id DESC';
    try {
      const result = await pool.query(query, [studentId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // Get all marks with pagination
  static async getAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const countQuery = 'SELECT COUNT(*) FROM marks';
    const dataQuery = 'SELECT * FROM marks ORDER BY id DESC LIMIT $1 OFFSET $2';

    try {
      const countResult = await pool.query(countQuery);
      const totalCount = parseInt(countResult.rows[0].count, 10);

      const dataResult = await pool.query(dataQuery, [limit, offset]);

      return {
        data: dataResult.rows,
        totalCount: totalCount,
        page: page,
        limit: limit,
        totalPages: Math.ceil(totalCount / limit),
      };
    } catch (error) {
      throw error;
    }
  }

  // Update mark
  static async update(id, subject, marks) {
    const query =
      'UPDATE marks SET subject = $1, marks = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *';

    try {
      const result = await pool.query(query, [subject, marks, id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Delete mark
  static async delete(id) {
    const query = 'DELETE FROM marks WHERE id = $1 RETURNING *';

    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Mark;
