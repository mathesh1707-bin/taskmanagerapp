# 🧠 Task Manager App

A backend REST API for managing users and their tasks, built using Spring Boot.

## 🚀 Features

- 👤 User Management (CRUD)
- ✅ Task Management (CRUD)
- 🔗 User ↔ Task Relationship (One-to-Many)
- 🛡️ Error Handling with Global Exception Handler
- 📡 RESTful API Design
- 💾 MySQL Database Integration

---

## 🏗️ Tech Stack

- Java
- Spring Boot
- Spring Data JPA
- MySQL
- Maven

---

## 📂 Project Structure

- controller → Handles API requests
- service → Business logic
- repository → Database access
- model → Entity classes


---

## 📡 API Endpoints

### 👤 User APIs

| Method | Endpoint | Description |
|--------|--------|-------------|
| POST | api/users/register | Create user |
| GET | api/users | Get all users |
| GET | api/users/{id} | Get user by ID |
| PUT | api/users/{id} | Update user |
| DELETE | api/users/{id} | Delete user |

---

### 📋 Task APIs

| Method | Endpoint | Description |
|--------|--------|-------------|
| POST | api/tasks | Create task for user |
| GET | api/tasks | Get all tasks of a user |
| GET | api/tasks/{id} | Get task by ID |
| PUT | api/tasks/{id} | Update task |
| DELETE | api/tasks/{id} | Delete task |


## 🧪 Sample Request (Create Task)

```json
{
  "title": "Learn Spring Boot",
  "description": "Complete Task Manager project",
  "status": "TODO"
}
```
⚙️ Setup Instructions

Clone the repo

git clone https://github.com/your-username/taskmanagerapp.git

Configure MySQL in application.properties

Run the app

mvn spring-boot:run


📌 Future Improvements

🔐 Authentication (JWT)

📊 Task filtering & pagination

🧾 DTO layer

🧪 Unit & Integration Testing

🌐 Deployment (Render / AWS)



👨‍💻 Author
Mathesh S
