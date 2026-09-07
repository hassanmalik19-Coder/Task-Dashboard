# Interactive Dynamic Task Dashboard Platform

## Task 3: Full-Stack Data Application

A functional full-stack Task Dashboard Platform that allows users to manage tasks through an interactive frontend connected to a Node.js/Express backend and a local MySQL database.

---

## GitHub Repository

**Repository:** `hassanmalik19-Coder/Task-Dashboard`

The complete source code for this project is maintained in the GitHub repository.

---

## Objective

The objective of this project is to build a functional full-stack data application supporting complete CRUD operations:

* **Create** tasks
* **Read** tasks
* **Update** tasks
* **Delete** tasks

The frontend communicates asynchronously with the backend API using JavaScript `async/await` and `fetch()`.

---

## Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Fetch API
* Async/Await

### Backend

* Node.js
* Express.js
* CORS
* dotenv

### Database

* MySQL
* MySQL2

---

## Project Architecture

```text
Task-Dashboard/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── config/
│   └── db.js
│
├── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

The application currently handles its API routes directly inside `server.js`. Separate `routes` and `controllers` folders are not required for the current implementation.

---

## Features

### 1. Create Task

Users can create a new task by providing:

* Task title
* Description
* Status
* Priority

The frontend sends the data to the backend using a `POST` request.

### 2. Read Tasks

The dashboard retrieves existing tasks from the database using a `GET` request and dynamically displays them in the interface.

### 3. Update Task

Users can edit existing tasks.

The frontend sends updated task information to the backend using a `PUT` request.

### 4. Delete Task

Users can delete tasks from the dashboard.

The frontend sends a `DELETE` request to the backend, which removes the selected task from the database.

---

## API Endpoints

| Method | Endpoint         | Purpose                  |
| ------ | ---------------- | ------------------------ |
| GET    | `/`              | Check API status         |
| GET    | `/api/test-db`   | Test database connection |
| GET    | `/api/tasks`     | Retrieve all tasks       |
| POST   | `/api/tasks`     | Create a new task        |
| PUT    | `/api/tasks/:id` | Update an existing task  |
| DELETE | `/api/tasks/:id` | Delete an existing task  |

---

## Database

The application uses a local MySQL database named:

```text
task_dashboard
```

The backend connects to MySQL through a connection pool using the MySQL2 promise-based API.

Database credentials are loaded from environment variables using `dotenv`.

---

## Environment Configuration

Create a `.env` file in the project root:

```env
MYSQLHOST=localhost
MYSQLPORT=3306
MYSQLUSER=root
MYSQLPASSWORD=
MYSQLDATABASE=task_dashboard

PORT=5001

JWT_SECRET=your_secret_key
```

If the local MySQL `root` user has a password, enter it in `MYSQLPASSWORD`.

> The `.env` file should not be uploaded to GitHub because it may contain sensitive configuration values.

---

## Backend Database Connection

The application uses a MySQL connection pool for database operations.

```javascript
const pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT || 3306,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
```

---

## Asynchronous Communication

The frontend communicates with the Express backend using asynchronous `fetch()` requests and `async/await`.

Example:

```javascript
const response = await fetch("http://localhost:5001/api/tasks");
const data = await response.json();
```

This allows the application to retrieve and modify data without requiring a full page reload.

---

## CRUD Workflow

```text
User
  │
  ▼
Task Dashboard Frontend
  │
  │ fetch() + async/await
  ▼
Node.js / Express REST API
  │
  ▼
Local MySQL Database
  │
  ▼
API Response
  │
  ▼
Dynamic Dashboard Update
```

---

## Local Installation

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* XAMPP or another local MySQL server
* Web browser

---

### 1. Clone the Repository

```bash
git clone https://github.com/hassanmalik19-Coder/Task-Dashboard.git
```

Then open the project directory:

```bash
cd Task-Dashboard
```

---

### 2. Install Dependencies

Run:

```bash
npm install
```

---

### 3. Start MySQL

Open XAMPP and start:

```text
MySQL
```

---

### 4. Create the Database

Open phpMyAdmin and create:

```text
task_dashboard
```

Make sure the required `tasks` table exists.

---

### 5. Configure `.env`

Create the `.env` file in the project root and configure the local MySQL credentials:

```env
MYSQLHOST=localhost
MYSQLPORT=3306
MYSQLUSER=root
MYSQLPASSWORD=
MYSQLDATABASE=task_dashboard

PORT=5001

JWT_SECRET=your_secret_key
```

---

### 6. Start the Backend

Run:

```bash
npm run dev
```

or:

```bash
npm start
```

The backend will run on:

```text
http://localhost:5001
```

---

## Testing the Backend

### API Status

Open:

```text
http://localhost:5001/
```

The API should return a successful response confirming that the Task Dashboard API is running.

### Database Connection

Open:

```text
http://localhost:5001/api/test-db
```

A successful response confirms that the backend is connected to the local MySQL database.

Example:

```json
{
    "success": true,
    "message": "Database connected successfully",
    "data": [
        {
            "result": 1
        }
    ]
}
```

---

## CRUD Testing

### Create

Create a new task through the dashboard and verify that it is stored in MySQL.

### Read

Load or refresh the dashboard and verify that saved tasks are retrieved from the database.

### Update

Edit an existing task and verify that the changes are reflected in both the dashboard and database.

### Delete

Delete a task and verify that it is removed from both the dashboard and database.

---

## Error Handling

The backend provides error handling for API and database operations.

The application handles cases such as:

* Missing task title
* Task not found
* Database connection failure
* Failed task creation
* Failed task retrieval
* Failed task update
* Failed task deletion

The API returns appropriate HTTP status codes and JSON responses.

---

## Security & Configuration

Sensitive configuration values are stored in environment variables rather than being hard-coded into the application.

The `.env` file should remain private.

The following should be included in `.gitignore`:

```text
.env
node_modules/
```

---

## Current Backend Structure

The project currently uses a simple backend architecture where API endpoints are defined directly in `server.js`.

This keeps the implementation straightforward for the current Task 3 requirements.

The `config/db.js` module is responsible for establishing the MySQL connection pool.

---

## Project Outcome

This project demonstrates a complete full-stack data application featuring:

* Interactive task dashboard
* Dynamic task management
* Asynchronous frontend communication
* JavaScript `fetch()` and `async/await`
* Node.js backend
* Express REST API
* Local MySQL database
* Complete CRUD functionality
* MySQL connection pooling
* API error handling
* Environment-based configuration

The application fulfills the requirements of:

**Task 3: Interactive Dynamic Task Dashboard Platform**
