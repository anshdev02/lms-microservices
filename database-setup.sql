-- ===============================
-- LMS Database Setup Script
-- ===============================
-- Run this script in MySQL to create the required databases
-- Make sure MySQL is running on localhost:3306

-- Create Auth Service Database
CREATE DATABASE IF NOT EXISTS lms_auth;

-- Create Course Service Database
CREATE DATABASE IF NOT EXISTS lms_course;

-- Show created databases
SHOW DATABASES LIKE 'lms_%';

-- Note: The tables will be auto-created by Spring Boot JPA (ddl-auto=update)
-- when you start the services for the first time
