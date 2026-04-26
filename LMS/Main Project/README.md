# LMS Microservices

A full-stack Learning Management System built with a microservices architecture using Spring Boot, Angular, and Docker.

## Tech Stack

- **Backend:** Java 17, Spring Boot 3.4, Spring Cloud (Eureka, Gateway)
- **Frontend:** Angular 20, TypeScript
- **Database:** MySQL 8.0
- **Infrastructure:** Docker, Docker Compose, Netflix Eureka

## Architecture

```
                        ┌─────────────┐
                        │   Frontend  │  :4200
                        │  (Angular)  │
                        └──────┬──────┘
                               │
                        ┌──────▼──────┐
                        │ API Gateway │  :8600
                        └──────┬──────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
     ┌────────▼───┐   ┌────────▼───┐   ┌────────▼───┐
     │    Auth    │   │    User    │   │   Course   │
     │  Service  │   │  Service  │   │  Service  │
     │   :8601   │   │   :8602   │   │   :8603   │
     └────────────┘   └────────────┘   └────────────┘
              │                │                │
     ┌────────▼───┐   ┌────────▼───┐
     │ Enrollment │   │ Assessment │
     │  Service  │   │  Service  │
     │   :8604   │   │   :8605   │
     └────────────┘   └────────────┘
                               │
                    ┌──────────▼──────────┐
                    │    Eureka Server    │  :8761
                    │  (Service Registry) │
                    └─────────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │       MySQL         │  :3306
                    └─────────────────────┘
```

## Services

| Service | Port | Description |
|---|---|---|
| Frontend | 4200 | Angular UI |
| API Gateway | 8600 | Single entry point, routes all requests |
| Auth Service | 8601 | Login and registration |
| User Service | 8602 | User management (Admin) |
| Course Service | 8603 | Courses and assignments |
| Enrollment Service | 8604 | Student enrollments |
| Assessment Service | 8605 | Quizzes and submissions |
| Eureka Server | 8761 | Service discovery and registry |

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (running)
- Java 17 JDK
- Maven 3.x

## Running with Docker

### 1. Build all JAR files

```powershell
cd "Main Project/eureka-server"   && mvn package -DskipTests
cd "../api-gateway"                && mvn package -DskipTests
cd "../auth-service"               && mvn package -DskipTests
cd "../user-service"               && mvn package -DskipTests
cd "../course-service"             && mvn package -DskipTests
cd "../enrollment-service"         && mvn package -DskipTests
cd "../assessment-service"         && mvn package -DskipTests
```

### 2. Start all services

```bash
cd "Main Project"
docker-compose up --build
```

Wait for all services to register with Eureka (~1-2 minutes).

### 3. Open the app

| URL | Description |
|---|---|
| http://localhost:4200 | Frontend (main app) |
| http://localhost:8761 | Eureka dashboard (service registry) |
| http://localhost:8600 | API Gateway |

## Docker Commands

```bash
# Start in background
docker-compose up -d

# View all running containers
docker ps

# View logs for a service
docker-compose logs -f auth-service

# Stop all services
docker-compose down

# Stop and remove all data (including database)
docker-compose down -v

# Rebuild a single service after code change
docker-compose up --build auth-service
```

## Running Locally (without Docker)

You'll need MySQL running locally with these databases created:

```sql
CREATE DATABASE lms_users;
CREATE DATABASE lms_courses;
CREATE DATABASE lms_enrollments;
CREATE DATABASE lms_assessments;
```

Then start each service in this order:
1. `eureka-server`
2. `api-gateway`
3. `auth-service`, `user-service`, `course-service`, `enrollment-service`, `assessment-service` (any order)
4. Frontend: `cd lms-frontend-module && npm install && ng serve`

## API Routes (via Gateway)

| Method | Path | Service | Description |
|---|---|---|---|
| POST | /auth/login | auth-service | Login |
| POST | /auth/register | auth-service | Register |
| GET | /users | user-service | Get all users |
| GET/POST | /courses | course-service | Manage courses |
| GET/POST | /assignments | course-service | Manage assignments |
| POST | /enroll | enrollment-service | Enroll in course |
| GET | /enroll/student/{id} | enrollment-service | Student enrollments |
| GET/POST | /assessments | assessment-service | Manage assessments |
| POST | /assessments/submit | assessment-service | Submit assessment |

## Project Structure

```
Main Project/
├── api-gateway/          # Spring Cloud Gateway
├── auth-service/         # Authentication
├── user-service/         # User management
├── course-service/       # Courses & assignments
├── enrollment-service/   # Enrollments
├── assessment-service/   # Assessments & submissions
├── eureka-server/        # Service registry
├── lms-frontend-module/  # Angular frontend
├── docker-compose.yml    # Docker orchestration
└── init-db.sql           # Database initialization
```

## User Roles

| Role | Access |
|---|---|
| ADMIN | Full access — manage users, courses, enrollments |
| INSTRUCTOR | Create and manage own courses and assessments |
| STUDENT | Enroll in courses, view content, submit assessments |
