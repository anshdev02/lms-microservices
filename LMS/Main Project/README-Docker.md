# LMS Microservices with Docker

## Prerequisites
- Docker and Docker Compose installed
- Java 17 (for building)

## Quick Start

1. **Build all services:**
   ```bash
   ./build-all.sh
   ```

2. **Start all services:**
   ```bash
   docker-compose up --build
   ```

3. **Start services in background:**
   ```bash
   docker-compose up -d
   ```

## Individual Service Commands

- **Stop all services:** `docker-compose down`
- **View logs:** `docker-compose logs [service-name]`
- **Restart a service:** `docker-compose restart [service-name]`
- **Stop a specific service:** `docker-compose stop [service-name]`

## Service URLs
- Eureka Server: http://localhost:8761
- API Gateway: http://localhost:8600
- Auth Service: http://localhost:8601
- User Service: http://localhost:8602
- Course Service: http://localhost:8603
- Enrollment Service: http://localhost:8604
- Assessment Service: http://localhost:8605
- Frontend: http://localhost:4200

## Testing Service Unavailability
To test the "service not working" popup:
```bash
docker-compose stop auth-service
# or
docker-compose stop course-service
```