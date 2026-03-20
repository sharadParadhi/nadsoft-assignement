-- Create Students Table
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Marks Table
CREATE TABLE IF NOT EXISTS marks (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL,
    subject VARCHAR(100) NOT NULL,
    marks DECIMAL(5, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Create Index for Better Query Performance
CREATE INDEX IF NOT EXISTS idx_student_email ON students(email);
CREATE INDEX IF NOT EXISTS idx_marks_student_id ON marks(student_id);

-- Insert Sample Data (Optional)
INSERT INTO students (name, email, age) VALUES
('John Doe', 'john.doe@example.com', 20),
('Jane Smith', 'jane.smith@example.com', 21),
('Bob Johnson', 'bob.johnson@example.com', 19),
('Alice Brown', 'alice.brown@example.com', 22),
('Charlie Wilson', 'charlie.wilson@example.com', 20)
ON CONFLICT (email) DO NOTHING;

INSERT INTO marks (student_id, subject, marks) VALUES
(1, 'Mathematics', 85.50),
(1, 'English', 78.25),
(1, 'Science', 92.00),
(2, 'Mathematics', 90.00),
(2, 'English', 88.75),
(2, 'Science', 85.50)
ON CONFLICT DO NOTHING;
