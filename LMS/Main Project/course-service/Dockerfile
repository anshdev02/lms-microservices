FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8603
ENTRYPOINT ["java", "-jar", "app.jar"]