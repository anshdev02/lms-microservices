#!/bin/bash

echo "Building all microservices..."

# Build each Spring Boot service with proper repackaging
services=("eureka-server" "api-gateway" "auth-service" "user-service" "course-service" "enrollment-service" "assessment-service")

for service in "${services[@]}"; do
    echo "Building $service..."
    cd "$service"
    ./mvnw clean package spring-boot:repackage -DskipTests
    cd ..
done

echo "All services built successfully!"
echo "Run 'docker compose up --build' to start all services"