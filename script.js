const API_URL = "http://localhost:5001/api/tasks";

const taskForm = document.getElementById("task-form");
const taskId = document.getElementById("task-id");
const title = document.getElementById("title");
const description = document.getElementById("description");
const status = document.getElementById("status");
const priority = document.getElementById("priority");

const tasksContainer = document.getElementById("tasks-container");
const loading = document.getElementById("loading");

const formTitle = document.getElementById("form-title");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");
const refreshBtn = document.getElementById("refresh-btn");

const totalCount = document.getElementById("total-count");
const pendingCount = document.getElementById("pending-count");
const progressCount = document.getElementById("progress-count");
const completedCount = document.getElementById("completed-count");

const themeToggle = document.getElementById("theme-toggle");

let allTasks = [];

async function fetchTasks() {
    try {
        loading.style.display = "block";

        const response = await fetch(API_URL);
        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message);
        }

        allTasks = result.data;
        displayTasks(allTasks);
        updateStats(allTasks);

    } catch (error) {
        console.error(error);

        tasksContainer.innerHTML = `
            <p>Failed to load tasks.</p>
        `;

    } finally {
        loading.style.display = "none";
    }
}

function updateStats(tasks) {
    totalCount.textContent = tasks.length;

    pendingCount.textContent = tasks.filter(
        task => task.status === "Pending"
    ).length;

    progressCount.textContent = tasks.filter(
        task => task.status === "In Progress"
    ).length;

    completedCount.textContent = tasks.filter(
        task => task.status === "Completed"
    ).length;
}

function displayTasks(tasks) {

    if (tasks.length === 0) {
        tasksContainer.innerHTML = `
            <p>No tasks found. Create your first task!</p>
        `;
        return;
    }

    tasksContainer.innerHTML = tasks.map(task => {

        let statusClass = "";

        if (task.status === "Pending") {
            statusClass = "status-pending";
        } else if (task.status === "In Progress") {
            statusClass = "status-progress";
        } else if (task.status === "Completed") {
            statusClass = "status-completed";
        }

        let priorityClass = "";

        if (task.priority === "High") {
            priorityClass = "priority-high";
        } else if (task.priority === "Medium") {
            priorityClass = "priority-medium";
        } else {
            priorityClass = "priority-low";
        }

        return `
            <div class="task-card">

                <h3>${task.title}</h3>

                <p>${task.description || "No description"}</p>

                <div class="task-info">

                    <span class="badge ${statusClass}">
                        ${task.status}
                    </span>

                    <span class="badge ${priorityClass}">
                        ${task.priority} Priority
                    </span>

                </div>

                <div class="task-actions">

                    <button
                        class="edit-btn"
                        onclick="editTask(${task.id})">
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteTask(${task.id})">
                        Delete
                    </button>

                </div>

            </div>
        `;
    }).join("");
}

taskForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const taskData = {
        title: title.value.trim(),
        description: description.value.trim(),
        status: status.value,
        priority: priority.value
    };

    if (!taskData.title) {
        alert("Please enter a task title.");
        return;
    }

    try {

        let response;

        if (taskId.value) {

            response = await fetch(`${API_URL}/${taskId.value}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(taskData)
            });

        } else {

            response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(taskData)
            });

        }

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message);
        }

        alert(result.message);

        resetForm();

        await fetchTasks();

    } catch (error) {

        console.error(error);
        alert("Something went wrong.");

    }
});

async function editTask(id) {

    try {

        const response = await fetch(API_URL);
        const result = await response.json();

        const task = result.data.find(task => task.id === id);

        if (!task) {
            alert("Task not found.");
            return;
        }

        taskId.value = task.id;
        title.value = task.title;
        description.value = task.description || "";
        status.value = task.status;
        priority.value = task.priority;

        formTitle.textContent = "Update Task";
        submitBtn.textContent = "Update Task";
        cancelBtn.hidden = false;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (error) {

        console.error(error);
        alert("Failed to load task.");

    }
}

async function deleteTask(id) {

    const confirmed = confirm(
        "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
        return;
    }

    try {

        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message);
        }

        alert(result.message);

        await fetchTasks();

    } catch (error) {

        console.error(error);
        alert("Failed to delete task.");

    }
}

function resetForm() {

    taskForm.reset();

    taskId.value = "";

    formTitle.textContent = "Create New Task";
    submitBtn.textContent = "Add Task";
    cancelBtn.hidden = true;

    priority.value = "Medium";
    status.value = "Pending";
}

cancelBtn.addEventListener("click", () => {
    resetForm();
});

refreshBtn.addEventListener("click", () => {
    fetchTasks();
});

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "☀";
        localStorage.setItem("theme", "dark");
    } else {
        themeToggle.textContent = "☾";
        localStorage.setItem("theme", "light");
    }

});

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀";
}

fetchTasks();