# Learning Management System - Microservices

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Microservices](https://img.shields.io/badge/Architecture-Microservices-blue?style=for-the-badge)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

# 📚 Learning Management System (LMS)

A **Full Stack Learning Management System built using Microservices Architecture**.  
This system allows **Admins, Mentors, and Students** to interact with the platform for managing courses and tracking learning progress.

The project demonstrates **scalable backend services, REST APIs, role-based access control, and full stack development**.

---

# 🚀 Features

## Admin
- Manage users (Mentors and Students)
- Add and manage courses
- Monitor platform activity

## Mentor
- Create and manage courses
- Upload course content
- Track student progress

## Student
- Browse available courses
- Enroll in courses
- Track course completion progress
- View completed lessons and remaining progress

---

# 🏗 Architecture

This project follows a **Microservices Architecture**, where different functionalities are handled by separate independent services.

Example services include:

- **User Service** – manages users (admin, mentor, student)
- **Course Service** – manages course creation and updates
- **Enrollment Service** – handles course enrollments
- **Progress Service** – tracks course completion
- **API Gateway** – routes requests to different services

Each microservice communicates using **REST APIs**.

---

# 🛠 Tech Stack

## Backend
- Java
- Spring Boot
- REST APIs
- Microservices Architecture

## Frontend
- Angular
- HTML
- CSS
- TypeScript

## Database
- MySQL
- MySQL Workbench (for database management)

## Tools & Technologies
- Git
- Postman
- Gradle / Maven
- VS Code
- MySQL Workbench

---

# 🗄 Database

The application uses **MySQL as the primary database**.

Database operations such as:

- Creating tables
- Managing schemas
- Running queries
- Monitoring data

are handled using **MySQL Workbench**.

The database stores information related to:

- Users
- Courses
- Enrollments
- Learning progress

---

# 📂 Project Structure

```
lms-microservices
│
├── user-service
├── course-service
├── enrollment-service
├── progress-service
├── api-gateway
│
├── frontend (Angular)
│
└── README.md
```

Each service handles a **specific domain of the system**, making the architecture scalable and maintainable.

---

# ▶️ How to Run the Project

## 1️⃣ Clone the repository

```
git clone https://github.com/anshdev02/lms-microservices.git
```

---

## 2️⃣ Navigate to the project folder

```
cd lms-microservices
```

---

## 3️⃣ Setup MySQL Database

1. Open **MySQL Workbench**
2. Create a database

```
CREATE DATABASE lms_db;
```

3. Update database configuration in the application properties file.

---

## 4️⃣ Start Backend Services

Run each microservice using:

```
./gradlew bootRun
```

or

```
mvn spring-boot:run
```

(depending on the build tool used)

---

## 5️⃣ Run the Frontend (Angular)

Navigate to the frontend directory:

```
cd frontend
```

Install dependencies:

```
npm install
```

Run the Angular application:

```
ng serve
```

The application will start on:

```
http://localhost:4200
```

---

# 📊 Key Functionalities

- Role-based access control
- Course management
- Student enrollment system
- Learning progress tracking
- Scalable microservices architecture
- RESTful API communication

---

# 🎯 Future Improvements

Possible enhancements for the system:

- JWT Authentication
- Course video hosting
- Payment gateway integration
- Notification service
- Course reviews and ratings
- Docker containerization
- Kubernetes deployment

---

# 👨‍💻 Author

**Ansh Saxena**

GitHub  
https://github.com/anshdev02

---

⭐ If you found this project useful, consider giving it a **star**!
