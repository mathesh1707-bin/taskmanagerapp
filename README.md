# 🧠 Task Manager Application (Full Stack)

A full-stack **Task Management Web Application** built using **Spring Boot, React, and MySQL**.
This project demonstrates real-world backend architecture, secure authentication using JWT, and dynamic frontend integration.

---

## 🚀 Features

### 🔐 Authentication & Security

* User Registration & Login
* Password hashing using BCrypt
* JWT-based authentication (stateless)
* Protected API endpoints using Spring Security

### 📋 Task Management

* Create, Read, Update, Delete (CRUD) tasks
* Associate tasks with specific users
* Track task status (TODO, IN_PROGRESS, DONE)

### ⚙️ Backend Highlights

* Layered Architecture (Controller → Service → Repository)
* DTO-based request/response handling
* Global Exception Handling
* RESTful API design

### 💻 Frontend (In Progress)

* React-based UI
* Login/Register pages
* Task dashboard with CRUD operations
* JWT token handling for API calls

---

## 🛠️ Tech Stack

### Backend

* Java 21
* Spring Boot
* Spring Security
* Spring Data JPA (Hibernate)
* MySQL
* JWT (io.jsonwebtoken)

### Frontend

* React (Vite)
* Axios

---

## 📂 Project Structure

### Backend

```
com.mathesh.taskmanagerapp
│
├── config          # Security configurations
├── security        # JWT utilities & filters
├── controller      # REST controllers
├── service         # Business logic
├── repository      # Data access layer
├── model           # Entities (User, Task)
├── dto             # Request/Response DTOs
├── exception       # Custom exception handling
```

---

## 🔑 API Endpoints

### Auth

* `POST /api/users/register`
* `POST /api/users/login`

### Tasks (Protected)

* `GET /api/tasks`
* `GET /api/tasks/{id}`
* `POST /api/tasks`
* `PUT /api/tasks/{id}`
* `DELETE /api/tasks/{id}`

---

## 🔐 JWT Authentication Flow

1. User logs in → receives JWT token
2. Token is sent in headers:

```
Authorization: Bearer <token>
```

3. Backend validates token using a custom JWT filter
4. Access granted to protected endpoints

---

## 🧪 Testing

* Tested using Postman
* Validated:

  * Authentication flow
  * CRUD operations
  * Exception handling
  * Security restrictions

---

## ⚡ Getting Started

### Backend Setup

```bash
git clone <repo-url>
cd backend
mvn clean install
mvn spring-boot:run
```

---

### Frontend Setup (Coming Soon)

```bash
cd frontend
npm install
npm run dev
```

---

## 📌 Future Improvements

* Role-based access (Admin/User)
* Pagination & filtering
* Cloud deployment (Render / Railway)
* UI enhancements with Tailwind
* Refresh tokens for JWT

---

## 👨‍💻 Author

**Mathesh S**
BE Computer Science Engineering
Focused on Backend Development & Full Stack Applications

---

## ⭐ Notes

This project is built as part of an internship task to demonstrate:

* Backend engineering fundamentals
* Secure API development
* Full-stack integration

---
