const pool = require('../config/database');

class Student {
  // Create a new student
  static async create(name, email, age) {
    const query =
      'INSERT INTO students (name, email, age) VALUES ($1, $2, $3) RETURNING *';
    try {
      const result = await pool.query(query, [name, email, age]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Get all students with pagination
  static async getAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const countQuery = 'SELECT COUNT(*) FROM students';
    const dataQuery =
      'SELECT * FROM students ORDER BY id DESC LIMIT $1 OFFSET $2';

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

  // Get student by ID with marks
  static async getById(id) {
    const studentQuery = 'SELECT * FROM students WHERE id = $1';
    const marksQuery =
      'SELECT * FROM marks WHERE student_id = $1 ORDER BY id DESC';

    try {
      const studentResult = await pool.query(studentQuery, [id]);

      if (studentResult.rows.length === 0) {
        return null;
      }

      const marksResult = await pool.query(marksQuery, [id]);

      return {
        ...studentResult.rows[0],
        marks: marksResult.rows,
      };
    } catch (error) {
      throw error;
    }
  }

  // Update student
  static async update(id, name, email, age) {
    const query =
      'UPDATE students SET name = $1, email = $2, age = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *';

    try {
      const result = await pool.query(query, [name, email, age, id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Delete student
  static async delete(id) {
    const query = 'DELETE FROM students WHERE id = $1 RETURNING *';

    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Search students
  static async search(searchTerm, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const searchPattern = `%${searchTerm}%`;

    const countQuery =
      'SELECT COUNT(*) FROM students WHERE name ILIKE $1 OR email ILIKE $1';
    const dataQuery =
      'SELECT * FROM students WHERE name ILIKE $1 OR email ILIKE $1 ORDER BY id DESC LIMIT $2 OFFSET $3';

    try {
      const countResult = await pool.query(countQuery, [searchPattern]);
      const totalCount = parseInt(countResult.rows[0].count, 10);

      const dataResult = await pool.query(dataQuery, [
        searchPattern,
        limit,
        offset,
      ]);

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
}

module.exports = Student;
