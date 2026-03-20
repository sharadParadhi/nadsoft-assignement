import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import StudentList from './components/StudentList';

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="#home">
            <h3 className="mb-0">Student Management System</h3>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <main>
        <StudentList />
      </main>

      <footer className="bg-dark text-white text-center py-4 mt-5">
        <Container>
          <p className="mb-0">
            &copy; 2026 Student Management System. All rights reserved.
          </p>
        </Container>
      </footer>
    </>
  );
}

export default App;
