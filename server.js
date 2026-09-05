const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Task Dashboard API is running"
    });
});

app.get("/api/test-db", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT 1 AS result");

        res.json({
            success: true,
            message: "Database connected successfully",
            data: rows
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Database connection failed"
        });
    }
});

app.get("/api/tasks", async (req, res) => {
    try {
        const [tasks] = await db.query(
            "SELECT * FROM tasks ORDER BY id DESC"
        );

        res.json({
            success: true,
            data: tasks
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch tasks"
        });
    }
});

app.post("/api/tasks", async (req, res) => {
    try {
        const { title, description, status, priority } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }

        const [result] = await db.query(
            `INSERT INTO tasks
            (title, description, status, priority)
            VALUES (?, ?, ?, ?)`,
            [
                title,
                description || null,
                status || "Pending",
                priority || "Medium"
            ]
        );

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            taskId: result.insertId
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create task"
        });
    }
});

app.put("/api/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, priority } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }

        const [result] = await db.query(
            `UPDATE tasks
             SET title = ?, description = ?, status = ?, priority = ?
             WHERE id = ?`,
            [
                title,
                description || null,
                status || "Pending",
                priority || "Medium",
                id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.json({
            success: true,
            message: "Task updated successfully"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to update task"
        });
    }
});

app.delete("/api/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query(
            "DELETE FROM tasks WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.json({
            success: true,
            message: "Task deleted successfully"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to delete task"
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});