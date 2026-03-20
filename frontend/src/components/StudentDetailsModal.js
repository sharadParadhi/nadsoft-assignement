import React, { useEffect, useState } from 'react';
import { Modal, Button, Table, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { studentAPI } from '../services/api';

const StudentDetailsModal = ({ show, handleClose, studentId }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      if (!studentId) {
        setStudent(null);
        return;
      }

      setLoading(true);
      try {
        const response = await studentAPI.getStudentById(studentId);
        setStudent(response.data.data);
      } catch (error) {
        const message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          'Failed to retrieve student details';
        Swal.fire('Error', message, 'error');
        handleClose();
      } finally {
        setLoading(false);
      }
    };

    if (show) {
      fetchStudent();
    } else {
      setStudent(null);
    }
  }, [show, studentId, handleClose]);

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Student Details and Marks</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" />
            <div className="mt-2">Loading student details...</div>
          </div>
        ) : !student ? (
          <div className="text-center py-4">No student selected.</div>
        ) : (
          <>
            <div className="mb-3">
              <strong>Name:</strong> {student.name}
              <br />
              <strong>Email:</strong> {student.email}
              <br />
              <strong>Age:</strong> {student.age}
              <br />
              <strong>Joined:</strong>{' '}
              {new Date(student.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </div>

            <h6>Marks</h6>
            {student.marks && student.marks.length > 0 ? (
              <div className="table-responsive">
                <Table striped hover size="sm" className="mb-0">
                  <thead>
                    <tr>
                      <th>Sr NO</th>
                      <th>Subject</th>
                      <th>Marks</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.marks.map((mark, idx) => (
                      <tr key={mark.id ?? idx}>
                        <td>{idx + 1}</td>
                        <td>{mark.subject}</td>
                        <td>{mark.marks}</td>
                        <td>
                          {new Date(mark.created_at).toLocaleDateString(
                            'en-US',
                            {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            },
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : (
              <p className="text-muted">No marks found for this student.</p>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StudentDetailsModal;
