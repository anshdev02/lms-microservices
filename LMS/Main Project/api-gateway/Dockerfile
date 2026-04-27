FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8600
ENTRYPOINT ["java", "-XX:TieredStopAtLevel=1", "-Xms64m", "-Xmx256m", "-jar", "app.jar"]
