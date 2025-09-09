## Task Manager – Backend (Spring Boot)

### Project overview
This is a robust backend API for the Task Manager application built with modern Spring Boot architecture. It provides a complete RESTful service for task management with enterprise-grade features and best practices.

**Core Features:**
- RESTful API endpoints for task CRUD operations
- In-memory H2 database with console access for development
- Data validation and error handling
- CORS configuration for frontend integration
- Clean architecture with layered design pattern

**Tech Stack:**
- **Java 21** - Latest LTS version with modern language features
- **Spring Boot 3.5.5** - Latest stable version with auto-configuration
- **Spring Web** - RESTful web services and MVC architecture
- **Spring Data JPA** - Data access layer with repository pattern
- **H2 Database** - In-memory database for development and testing
- **Jakarta Validation** - Bean validation for data integrity
- **Hibernate Validator** - Advanced validation capabilities
- **Lombok** - Code generation for boilerplate reduction

### Architecture & Implementation Details

#### **Layered Architecture Pattern**
The application follows a clean, layered architecture with clear separation of concerns:

**1. Controller Layer (`TaskController.java`)**
- **RESTful Endpoints**: Handles HTTP requests and responses
- **CORS Configuration**: Enables cross-origin requests from frontend (`http://localhost:5173`)
- **Request Mapping**: Base path `/tasks` with GET and POST operations
- **Dependency Injection**: Constructor-based injection for service layer

**2. Service Layer (`TaskService` & `TaskServiceImpl.java`)**
- **Business Logic**: Encapsulates application business rules
- **Interface-Implementation Pattern**: Promotes loose coupling and testability
- **Transaction Management**: Automatic transaction handling via Spring
- **Service Abstraction**: Clean separation between controller and repository layers

**3. Repository Layer (`TaskRepository.java`)**
- **Spring Data JPA**: Extends `JpaRepository<Task, Long>` for automatic CRUD operations
- **Query Methods**: Leverages Spring Data's method naming conventions
- **Database Abstraction**: No SQL code required, handled by Spring Data JPA

**4. Model Layer (`Task.java`)**
- **JPA Entity**: Maps to database table with `@Entity` and `@Table` annotations
- **Data Validation**: Uses Jakarta Validation (`@NotBlank`) for input validation
- **Auto-Generated IDs**: Primary key with `@GeneratedValue(strategy = GenerationType.IDENTITY)`
- **Column Mapping**: Explicit column definitions with constraints

#### **Key Features Implemented**

**Data Validation:**
- **Bean Validation**: `@NotBlank` ensures title is mandatory
- **Database Constraints**: `nullable = false` at database level
- **Input Sanitization**: Automatic validation on request body binding

**Database Configuration:**
- **H2 In-Memory**: Fast development database with console access
- **Auto-DDL**: `spring.jpa.hibernate.ddl-auto=update` for schema management
- **Connection Pooling**: Optimized database connections
- **Console Access**: Web-based database browser at `/h2-console`

**API Design:**
- **RESTful Principles**: Standard HTTP methods and status codes
- **JSON Serialization**: Automatic object-to-JSON conversion
- **Error Handling**: Built-in Spring Boot error responses
- **Content Negotiation**: Automatic content-type handling

**Security & CORS:**
- **CORS Configuration**: `@CrossOrigin` annotation for frontend integration
- **Origin Restriction**: Specific origin allowed for security
- **Preflight Handling**: Automatic OPTIONS request handling

#### **Spring Boot Features Utilized**
- **Auto-Configuration**: Automatic bean creation and configuration
- **Embedded Server**: Built-in Tomcat server
- **DevTools**: Hot reloading and development utilities
- **Actuator Ready**: Health checks and monitoring endpoints available
- **Profile Support**: Environment-specific configuration support

### Setup instructions

**Prerequisites:**
- Java 21 (or a compatible JDK)
- Maven (or use the provided Maven Wrapper `mvnw`)

**Step 1: Clone and Navigate**
```bash
cd backend
```

**Step 2: Run the Application**
Using Maven Wrapper (recommended):
```bash
./mvnw spring-boot:run
```

Or with a local Maven installation:
```bash
mvn spring-boot:run
```

**Step 3: Verify Application is Running**
- **Base URL**: `http://localhost:8080`
- **Health Check**: Visit `http://localhost:8080/actuator/health` (if actuator is enabled)
- **API Test**: Visit `http://localhost:8080/tasks` to see empty task list `[]`

**Step 4: Access H2 Database Console (Optional)**
- **URL**: `http://localhost:8080/h2-console/`
- **JDBC URL**: `jdbc:h2:mem:taskdb`
- **Username**: `database`
- **Password**: `1234`
- **Driver Class**: `org.h2.Driver`

**Step 5: CORS Configuration**
- CORS is already configured for `http://localhost:5173` (React frontend)
- No additional configuration needed for local development

**Troubleshooting:**
- **Port 8080 in use**: Change port in `application.properties` with `server.port=8081`
- **Java version issues**: Ensure Java 21+ is installed and `JAVA_HOME` is set correctly
- **Maven issues**: Use the provided `mvnw` wrapper instead of local Maven

### API Endpoints

| Method | URL                          | Description            | Request Body | Response |
|--------|-------------------------------|------------------------|--------------|----------|
| GET    | `http://localhost:8080/tasks` | Returns all tasks      | None         | `List<Task>` |
| POST   | `http://localhost:8080/tasks` | Creates a new task     | `Task` JSON  | `Task` with ID |

**GET /tasks**
- **Purpose**: Retrieve all tasks from the database
- **Response**: Array of task objects with auto-generated IDs
- **Status Codes**: 200 (Success), 500 (Server Error)

**POST /tasks**
- **Purpose**: Create a new task with validation
- **Validation**: Title is mandatory (`@NotBlank`)
- **Response**: Created task with auto-generated ID
- **Status Codes**: 201 (Created), 400 (Validation Error), 500 (Server Error)

**Sample POST request body:**
```json
{
  "title": "Prepare presentation",
  "description": "Finalize slides for Monday's meeting"
}
```

**Sample Response:**
```json
{
  "id": 1,
  "title": "Prepare presentation",
  "description": "Finalize slides for Monday's meeting"
}
```

**Error Response Example:**
```json
{
  "timestamp": "2024-01-15T10:30:00.000+00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Title is mandatory"
}
```

### Package Structure & Code Organization

The project follows a clean, layered architecture with well-defined package responsibilities:

**`com.example.taskmanager.controller`**
- **`TaskController.java`** - REST controller handling HTTP requests
  - `@RestController` with `@RequestMapping("/tasks")`
  - CORS configuration for frontend integration
  - Constructor-based dependency injection

**`com.example.taskmanager.service`**
- **`TaskService.java`** - Service interface defining business operations
- **`TaskServiceImpl.java`** - Service implementation with business logic
  - `@Service` annotation for Spring component scanning
  - Transaction management and data access delegation

**`com.example.taskmanager.repository`**
- **`TaskRepository.java`** - Data access layer interface
  - Extends `JpaRepository<Task, Long>` for automatic CRUD operations
  - Spring Data JPA method naming conventions

**`com.example.taskmanager.model`**
- **`Task.java`** - JPA entity representing the task domain model
  - `@Entity` with `@Table(name = "tasks")` mapping
  - Jakarta Validation annotations for data integrity
  - Auto-generated primary key with `@GeneratedValue`

**`com.example.taskmanager`**
- **`BackendApplication.java`** - Main Spring Boot application class
  - `@SpringBootApplication` with auto-configuration
  - Application entry point and configuration

**Configuration Files:**
- **`application.properties`** - Database and application configuration
- **`pom.xml`** - Maven dependencies and build configuration

### H2 screenshots
How to connect to H2 (via `http://localhost:8080/h2-console/`):
![img_1.png](img_1.png)

Sample data in H2:
![img.png](img.png)
