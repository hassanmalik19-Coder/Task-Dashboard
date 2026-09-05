# Interactive Dynamic Task Dashboard Platform

A functional full-stack task management dashboard developed as part of **Task 3: Interactive Dynamic Task Dashboard Platform**.

The application provides a dynamic interface for managing tasks with complete **CRUD (Create, Read, Update, Delete)** functionality. The frontend communicates asynchronously with a Node.js/Express backend API, while task data is stored and managed using a MySQL database.

## Features

* Create new tasks
* View all tasks dynamically
* Update existing tasks
* Delete tasks
* Task status management
* Interactive dashboard interface
* Asynchronous API communication using `fetch()` and `async/await`
* RESTful backend API
* MySQL database integration
* Responsive and user-friendly interface
* Error handling for API/database operations

## Technologies Used

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript
* Fetch API
* Async/Await

### Backend

* Node.js
* Express.js
* REST API

### Database

* MySQL
* MySQL2 Node.js driver

## Project Architecture

The application follows a full-stack architecture:

```text
Frontend
   │
   │  Async Fetch Requests
   ▼
Node.js / Express API
   │
   │  SQL Queries
   ▼
MySQL Database
```

The frontend sends asynchronous HTTP requests to the Express backend. The backend processes these requests and performs CRUD operations on the MySQL database.

## CRUD Operations

The application supports all four fundamental data operations:

| Operation | Description                |
| --------- | -------------------------- |
| Create    | Add a new task             |
| Read      | Retrieve and display tasks |
| Update    | Modify an existing task    |
| Delete    | Remove a task              |

## API Endpoints

The backend provides REST API endpoints for task management.

| Method | Endpoint         | Purpose            |
| ------ | ---------------- | ------------------ |
| GET    | `/api/tasks`     | Retrieve all tasks |
| POST   | `/api/tasks`     | Create a new task  |
| PUT    | `/api/tasks/:id` | Update a task      |
| DELETE | `/api/tasks/:id` | Delete a task      |

## Database

The application uses **MySQL** for persistent task storage.

Database configuration is handled through environment variables to keep sensitive credentials outside the source code.

Example environment configuration:

```env
MYSQLHOST=your_database_host
MYSQLPORT=3306
MYSQLUSER=your_database_user
MYSQLPASSWORD=your_database_password
MYSQLDATABASE=your_database_name

PORT=5001
JWT_SECRET=your_secret_key
```

> **Note:** Actual database credentials and secret keys should never be committed to GitHub.

## Project Structure

```text
Task-Dashboard/
│
├── index.html
├── style.css
├── script.js
│
├── server.js
├── db.js
├── taskController.js
├── taskRoutes.js
│
├── package.json
├── package-lock.json
└── README.md
```

## How It Works

1. The user interacts with the task dashboard through the frontend.
2. JavaScript sends asynchronous requests using the Fetch API.
3. The Express.js backend receives and processes the requests.
4. Controllers execute the required database operations.
5. MySQL stores or retrieves the task information.
6. The backend returns the result to the frontend.
7. The dashboard updates dynamically without requiring a full page reload.

## Installation

Clone the repository:

```bash
git clone https://github.com/hassanmalik19-Coder/Task-Dashboard.git
```

Navigate to the project directory:

```bash
cd Task-Dashboard
```

Install dependencies:

```bash
npm install
```

Configure the required environment variables in a `.env` file.

Start the server:

```bash
npm start
```

The application can then be accessed through the configured server URL.

## Security

* Database credentials are stored using environment variables.
* Sensitive `.env` files should not be committed to the repository.
* Backend API handles database communication instead of exposing database credentials to the frontend.
* JWT-based authentication support is included in the backend configuration.

## Screenshots

Screenshots demonstrating the application's interface and CRUD operations can be added below.

### Dashboard

*Add dashboard screenshot here.*

### Create / Update Task

*Add task form screenshot here.*

### Task Management

*Add CRUD/task management screenshot here.*

## Learning Outcomes

Through this project, the following concepts were implemented:

* Full-stack web application development
* RESTful API development
* CRUD operations
* Asynchronous JavaScript programming
* `fetch()` and `async/await`
* Express.js backend development
* MySQL database integration
* Frontend-backend communication
* Environment variable management
* Basic application security practices

## Repository

**GitHub Repository:**
https://github.com/hassanmalik19-Coder/Task-Dashboard

## Task Information

**Task:** Task 3 – Interactive Dynamic Task Dashboard Platform

**Objective:** Build a functional full-stack data application allowing users to perform CRUD actions through an asynchronous frontend interface connected to a backend API and database.

