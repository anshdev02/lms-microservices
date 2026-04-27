CREATE DATABASE IF NOT EXISTS lms_users;
CREATE DATABASE IF NOT EXISTS lms_courses;
CREATE DATABASE IF NOT EXISTS lms_enrollments;
CREATE DATABASE IF NOT EXISTS lms_assessments;

USE lms_users;
CREATE TABLE IF NOT EXISTS users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL
);
INSERT IGNORE INTO users (username, password, role) VALUES
('admin', 'admin123', 'ADMIN'),
('instructor', 'instructor123', 'INSTRUCTOR'),
('student', 'student123', 'STUDENT');
