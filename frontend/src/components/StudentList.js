import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Pagination,
  Container,
  Row,
  Col,
  InputGroup,
  Form,
} from 'react-bootstrap';
import Swal from 'sweetalert2';
import { studentAPI } from '../services/api';
import StudentForm from './StudentForm';
import StudentDetailsModal from './StudentDetailsModal';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Fetch students
  const fetchStudents = async (page = 1, search = '') => {
    setLoading(true);
    try {
      let response;
      if (search) {
        response = await studentAPI.searchStudents(search, page, limit);
      } else {
        response = await studentAPI.getAllStudents(page, limit);
      }
      setStudents(response.data.data);
      setCurrentPage(response.data.pagination.page);
      setTotalPages(response.data.pagination.totalPages);
      setTotalCount(response.data.pagination.totalCount);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch students', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(1, searchTerm);
  }, [limit]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1);
    fetchStudents(1, value);
  };

  const handleAddStudent = () => {
    setEditingStudent(null);
    setShowForm(true);
  };

  const handleViewStudentDetails = (id) => {
    setSelectedStudentId(id);
    setShowDetails(true);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleDeleteStudent = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to reverse this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await studentAPI.deleteStudent(id);
          Swal.fire('Deleted!', 'Student has been deleted.', 'success');
          fetchStudents(currentPage, searchTerm);
        } catch (error) {
          Swal.fire('Error', 'Failed to delete student', 'error');
        }
      }
    });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchStudents(newPage, searchTerm);
  };

  const handleStudentSaved = () => {
    fetchStudents(currentPage, searchTerm);
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value, 10);
    setLimit(newLimit);
    setCurrentPage(1);
  };

  const paginationItems = [];
  for (let page = 1; page <= totalPages; page++) {
    paginationItems.push(
      <Pagination.Item
        key={page}
        active={page === currentPage}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </Pagination.Item>,
    );
  }

  return (
    <Container className="mt-4 mb-5">
      {/* Search and Action Section */}
      <Row className="search-section mb-4">
        <Col xs={12} md={6} className="mb-3 mb-md-0">
          <InputGroup>
            <InputGroup.Text
              className="bg-white"
              style={{ borderColor: '#e2e8f0' }}
            >
              🔍
            </InputGroup.Text>
            <Form.Control
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={handleSearch}
              aria-label="Search students"
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={6} className="d-flex justify-content-md-end">
          <Button
            variant="primary"
            onClick={handleAddStudent}
            className="w-100 w-md-auto"
          >
            <span>➕</span> Add Student
          </Button>
        </Col>
      </Row>

      {/* Students Table */}
      <div className="table-responsive">
        <Table striped hover className="mb-0">
          <thead>
            <tr>
              <th className="text-nowrap">Sr No.</th>
              <th className="text-nowrap">Name</th>
              <th className="d-none d-md-table-cell text-nowrap">Email</th>
              <th className="d-none d-lg-table-cell text-nowrap">Age</th>
              <th className="d-none d-lg-table-cell text-nowrap">Date</th>
              <th className="text-center text-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  <div>
                    <div
                      className="spinner-border text-primary me-2"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    Loading students...
                  </div>
                </td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-5">
                  <div className="empty-state">
                    <div className="empty-state-icon">📭</div>
                    <h5 className="text-secondary">No students found</h5>
                    <p className="text-muted mb-0">
                      Add a new student to get started
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              students.map((student, index) => (
                <tr key={student.id} className="align-middle">
                  <td>
                    <span className="d-none d-md-table-cell">{index + 1}</span>
                  </td>
                  <td>
                    <span className="text-dark">{student.name}</span>
                    <br />
                    <small className="d-md-none text-muted">
                      {student.email}
                    </small>
                  </td>
                  <td className="d-none d-md-table-cell">{student.email}</td>
                  <td className="d-none d-lg-table-cell">{student.age}</td>
                  <td className="d-none d-lg-table-cell text-muted">
                    {new Date(student.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="text-center">
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleViewStudentDetails(student.id)}
                      className="me-2 mb-2 mb-md-0"
                      title="View marks"
                    >
                      📘 View Marks
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEditStudent(student)}
                      className="me-2 mb-2 mb-md-0"
                      title="Edit student"
                    >
                      ✏️ Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteStudent(student.id)}
                      title="Delete student"
                    >
                      🗑️ Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Entries Selector and Pagination - On One Line */}
      <Row className="pagination-section mt-4 align-items-center justify-content-between">
        <Col
          xs={12}
          md={4}
          className="d-flex justify-content-start mb-3 mb-md-0"
        >
          <div className="entries-selector">
            <span>Show</span>
            <Form.Select
              value={limit}
              onChange={handleLimitChange}
              size="sm"
              aria-label="Select number of entries"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Form.Select>
            <span>entries</span>
          </div>
        </Col>
        <Col xs={12} md={8} className="d-flex flex-column align-items-center">
          {totalPages > 1 && (
            <Pagination className="flex-wrap justify-content-center mb-2">
              <Pagination.First
                disabled={currentPage === 1}
                onClick={() => handlePageChange(1)}
                title="First page"
              />
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                title="Previous page"
              />
              {paginationItems}
              <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                title="Next page"
              />
              <Pagination.Last
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(totalPages)}
                title="Last page"
              />
            </Pagination>
          )}
          <div className="pagination-info">
            Showing {students.length} of {totalCount} students (Page{' '}
            {currentPage} of {totalPages === 0 ? 1 : totalPages})
          </div>
        </Col>
      </Row>

      {/* Add/Edit Student Modal */}
      <StudentForm
        show={showForm}
        handleClose={() => setShowForm(false)}
        onStudentSaved={handleStudentSaved}
        editingStudent={editingStudent}
      />

      {/* View Student Details and Marks Modal */}
      <StudentDetailsModal
        show={showDetails}
        handleClose={() => setShowDetails(false)}
        studentId={selectedStudentId}
      />
    </Container>
  );
};

export default StudentList;
