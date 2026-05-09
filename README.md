# Task Manager App

A full-stack Task Management Application built using Spring Boot, React, MySQL, and JWT Authentication.

This project allows users to register, log in securely, and manage their own tasks with a modern responsive UI.

---

# Features

## Authentication & Security
- User Registration
- User Login
- JWT Authentication
- Protected Backend APIs
- Protected Frontend Routes
- Password Hashing using BCrypt
- Spring Security Integration

## Task Management
- Create Tasks
- View Tasks
- Update Tasks
- Delete Tasks
- User-Specific Tasks
- Task Status Filtering
- Edit Modal
- Delete Confirmation

## UI & UX
- Modern Responsive Dashboard
- TailwindCSS Styling
- Toast Notifications
- Loading Spinner
- Smooth Hover Animations
- Responsive Grid Layout

## Backend Architecture
- DTO-Based API Design
- Global Exception Handling
- Layered Architecture
  - Controller
  - Service
  - Repository
- RESTful APIs
- JPA & Hibernate

---

# Tech Stack

## Frontend
- React
- Vite
- TailwindCSS
- Axios
- React Router DOM
- React Hot Toast

## Backend
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT
- Maven

## Database
- MySQL

---

# Project Structure

```bash
TaskManagerApp
│
├── backend
│   ├── controller
│   ├── service
│   ├── repository
│   ├── model
│   ├── dto
│   ├── security
│   ├── exception
│   └── config
│
└── frontend
    ├── src
    │   ├── pages
    │   ├── components
    │   ├── api
    │   └── assets
```

---

# API Endpoints

## Authentication

### Register User
```http
POST /api/users/register
```

### Login User
```http
POST /api/users/login
```

---

## Tasks

### Get All Tasks
```http
GET /api/tasks
```

### Create Task
```http
POST /api/tasks
```

### Update Task
```http
PUT /api/tasks/{taskId}
```

### Delete Task
```http
DELETE /api/tasks/{taskId}
```

---

# Setup Instructions

## Clone Repository

```bash
git clone <your-repository-url>
```

---

# Backend Setup

## Navigate to Backend

```bash
cd backend
```

## Configure Database

Update:

```properties
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/taskmanagerapp
spring.datasource.username=root
spring.datasource.password=yourpassword
```

---

## Run Backend

```bash
mvn spring-boot:run
```

Backend runs on:

```bash
http://localhost:7000
```

---

# Frontend Setup

## Navigate to Frontend

```bash
cd frontend
```

## Install Dependencies

```bash
npm install
```

## Run Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Authentication Flow

1. User registers
2. Password gets hashed using BCrypt
3. User logs in
4. JWT token generated
5. Token stored in localStorage
6. Axios interceptor attaches token to requests
7. Protected APIs validate JWT
8. User accesses only their own tasks

---

# Current Features Completed

- JWT Authentication
- User-Specific Task Filtering
- Protected Routes
- CRUD Operations
- DTO Architecture
- Exception Handling
- Toast Notifications
- Loading Spinner
- Task Filtering
- Responsive Dashboard UI

---

# Future Improvements

- Due Dates
- Overdue Task Highlighting
- Dark/Light Theme Toggle
- Search Tasks
- Drag & Drop Tasks
- Task Categories
- Deployment
- Docker Support

---

# Author

Mathesh Subramanian

Built as a full-stack learning project using Spring Boot and React.