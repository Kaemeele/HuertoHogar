# Multistage build for HuertoHogar backend
# ---- Builder stage ----
FROM maven:3.9.9-eclipse-temurin-21-alpine AS builder
WORKDIR /app
# Copy Maven wrapper and pom
COPY mvnw ./
COPY .mvn/ .mvn/
COPY pom.xml ./
# Resolve dependencies (download) – will be cached
RUN ./mvnw -B dependency:resolve
# Copy source code
COPY src ./src
# Package the application
RUN ./mvnw -B package -DskipTests
# ---- Runtime stage ----
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
# Copy the jar from builder stage
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]