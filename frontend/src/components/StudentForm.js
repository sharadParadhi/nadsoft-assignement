import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { studentAPI } from '../services/api';

const StudentForm = ({ show, handleClose, onStudentSaved, editingStudent }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name,
        email: editingStudent.email,
        age: editingStudent.age,
      });
    } else {
      setFormData({
        name: '',
        email: '',
        age: '',
      });
    }
  }, [editingStudent, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.age) {
      Swal.fire('Error', 'Please fill all fields', 'error');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Swal.fire('Error', 'Please enter a valid email', 'error');
      return;
    }

    if (formData.age < 0 || formData.age > 120) {
      Swal.fire('Error', 'Age must be between 0 and 120', 'error');
      return;
    }

    setLoading(true);
    try {
      if (editingStudent) {
        await studentAPI.updateStudent(editingStudent.id, formData);
        Swal.fire('Success', 'Student updated successfully', 'success');
      } else {
        await studentAPI.createStudent(formData);
        Swal.fire('Success', 'Student created successfully', 'success');
      }
      onStudentSaved();
      handleClose();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'An error occurred';
      Swal.fire('Error', errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {editingStudent ? 'Edit Student' : 'Add Student'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Member Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter member name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Member Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter member email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Member Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter member age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="0"
              max="120"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Member ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Auto-generated ID"
              disabled
              value={editingStudent ? editingStudent.id : 'New'}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            className="w-100"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default StudentForm;
