## Task Manager – Backend (Spring Boot)

### Project overview
This is the backend API for the Task Manager application. It exposes REST endpoints to create and retrieve tasks. The application uses an in-memory H2 database for persistence during development.

Tech stack:
- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- H2 Database (in-memory)

### Setup instructions

Prerequisites:
- Java 21 (or a compatible JDK)
- Maven (or use the provided Maven Wrapper `mvnw`)

1) Install dependencies and run (using Maven Wrapper):
```bash
./mvnw spring-boot:run
```
Or with a local Maven installation:
```bash
mvn spring-boot:run
```

2) Application URL
- Base URL: `http://localhost:8080`

3) H2 database console (optional)
- Visit: `http://localhost:8080/h2-console/`
- The JDBC URL, username, and password are configured in `src/main/resources/application.properties`.

4) CORS
- If you are using the React frontend (Vite dev server on `http://localhost:5173`), ensure CORS is enabled for that origin.

### API Endpoints

| Method | URL                          | Description            |
|--------|-------------------------------|------------------------|
| GET    | `http://localhost:8080/tasks` | Returns all tasks      |
| POST   | `http://localhost:8080/tasks` | Creates a new task     |

Sample POST request body:
```json
{
  "title": "Prepare presentation",
  "description": "Finalize slides for Monday's meeting"
}
```

### Package structure
- `controller` – REST controllers
- `service` – Business logic and interfaces/implementations
- `repository` – Spring Data JPA repositories
- `model` – JPA entities

### H2 screenshots
How to connect to H2 (via `http://localhost:8080/h2-console/`):
![img_1.png](img_1.png)

Sample data in H2:
![img.png](img.png)
