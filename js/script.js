// =========================
// 1. LOCAL STORAGE
// =========================

const STORAGE_KEYS = {
    tasks: "dailySpace_tasks",
    links: "dailySpace_links",
    name: "dailySpace_name"
};


function getStorage(key, fallback) {
    try {
        const data = localStorage.getItem(key);
        return data === null ? fallback : JSON.parse(data);
    } catch (error) {
        console.error("Storage error:", error);
        return fallback;
    }
}


function saveStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error("Unable to save data:", error);
    }
}


// =========================
// 2. CLOCK & GREETING
// =========================

const currentTime = document.getElementById("current-time");
const currentDate = document.getElementById("current-date");
const currentDay = document.getElementById("current-day");
const greeting = document.getElementById("greeting");

const nameForm = document.getElementById("name-form");
const nameInput = document.getElementById("user-name");

let userName = localStorage.getItem(STORAGE_KEYS.name) || "";


function updateClock() {

    const now = new Date();

    const hours = now.getHours();

    // Update time

    currentTime.textContent = now.toLocaleTimeString("en-GB");

    // Update date

    currentDate.textContent = now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    }).toUpperCase();

    currentDay.textContent = now.toLocaleDateString("en-US", {
        weekday: "long"
    });

    // Greeting based on time

    let greetingText;

    if (hours >= 5 && hours < 12) {
        greetingText = "Good Morning";
    } else if (hours >= 12 && hours < 17) {
        greetingText = "Good Afternoon";
    } else if (hours >= 17 && hours < 21) {
        greetingText = "Good Evening";
    } else {
        greetingText = "Good Night";
    }

    greeting.textContent = userName
        ? `${greetingText}, ${userName}!`
        : `${greetingText}!`;
}


// Update clock every second

updateClock();

setInterval(updateClock, 1000);


// Save custom name

nameInput.value = userName;


nameForm.addEventListener("submit", function(event) {

    event.preventDefault();

    userName = nameInput.value.trim();

    if (!userName) {
        userName = "";
        localStorage.removeItem(STORAGE_KEYS.name);
    } else {
        localStorage.setItem(STORAGE_KEYS.name, userName);
    }

    updateClock();

});


// =========================
// 3. TODO LIST
// =========================

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");

const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");

const taskMessage = document.getElementById("task-message");

const totalTasks = document.getElementById("total-tasks");
const completedTasks = document.getElementById("completed-tasks");
const remainingTasks = document.getElementById("remaining-tasks");

const taskCount = document.getElementById("task-count");
const sortTasks = document.getElementById("sort-tasks");


let tasks = getStorage(STORAGE_KEYS.tasks, []);

if (!Array.isArray(tasks)) {
    tasks = [];
}


function saveTasks() {
    saveStorage(STORAGE_KEYS.tasks, tasks);
}


// Show task message

function showTaskMessage(message) {

    taskMessage.textContent = message;

}


// Add new task

taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const taskName = taskInput.value.trim();

    if (!taskName) return;

    // Prevent duplicate tasks

    const duplicate = tasks.some(task =>
        task.text.toLowerCase() === taskName.toLowerCase()
    );

    if (duplicate) {

        showTaskMessage("This task already exists!");

        return;

    }

    // Create task object

    const newTask = {
        id: crypto.randomUUID(),
        text: taskName,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();

    renderTasks();

    taskInput.value = "";

    showTaskMessage("");

});


// Render tasks

function renderTasks() {

    taskList.innerHTML = "";

    // Sort tasks

    let sortedTasks = [...tasks];

    const sortValue = sortTasks.value;

    if (sortValue === "alphabetical") {

        sortedTasks.sort((a, b) =>
            a.text.localeCompare(b.text)
        );

    } else if (sortValue === "pending") {

        sortedTasks.sort((a, b) =>
            Number(a.completed) - Number(b.completed)
        );

    } else if (sortValue === "completed") {

        sortedTasks.sort((a, b) =>
            Number(b.completed) - Number(a.completed)
        );

    }


    // Create task elements

    sortedTasks.forEach(function(task) {

        const listItem = document.createElement("li");

        listItem.className = "task-item";

        if (task.completed) {
            listItem.classList.add("completed");
        }


        // Checkbox

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";

        checkbox.checked = task.completed;

        checkbox.setAttribute(
            "aria-label",
            `Complete ${task.text}`
        );


        // Task text

        const taskText = document.createElement("span");

        taskText.className = "task-text";
        taskText.textContent = task.text;


        // Action buttons

        const actions = document.createElement("section");

        actions.className = "task-actions";


        // Edit button

        const editButton = document.createElement("button");

        editButton.type = "button";
        editButton.textContent = "Edit";
        editButton.setAttribute("aria-label", `Edit ${task.text}`);


        // Delete button

        const deleteButton = document.createElement("button");

        deleteButton.type = "button";
        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-button";

        deleteButton.setAttribute(
            "aria-label",
            `Delete ${task.text}`
        );


        // Append elements

        actions.append(editButton, deleteButton);

        listItem.append(
            checkbox,
            taskText,
            actions
        );

        taskList.appendChild(listItem);


        // Mark task as completed

        checkbox.addEventListener("change", function() {

            task.completed = checkbox.checked;

            saveTasks();

            renderTasks();

        });


        // Edit task

        editButton.addEventListener("click", function() {

            const newText = prompt(
                "Edit your task:",
                task.text
            );

            if (newText === null) return;

            const updatedText = newText.trim();

            if (!updatedText) return;

            // Prevent duplicate when editing

            const duplicate = tasks.some(item =>
                item.id !== task.id &&
                item.text.toLowerCase() === updatedText.toLowerCase()
            );

            if (duplicate) {

                showTaskMessage("This task already exists!");

                return;

            }

            task.text = updatedText;

            showTaskMessage("");

            saveTasks();

            renderTasks();

        });


        // Delete task

        deleteButton.addEventListener("click", function() {

            tasks = tasks.filter(item =>
                item.id !== task.id
            );

            saveTasks();

            renderTasks();

        });

    });


    // Update task statistics

    const completed = tasks.filter(task =>
        task.completed
    ).length;

    const remaining = tasks.length - completed;


    totalTasks.textContent = tasks.length;

    completedTasks.textContent = completed;

    remainingTasks.textContent = remaining;

    taskCount.textContent = `${tasks.length} tasks`;


    // Show empty message

    emptyMessage.hidden = tasks.length !== 0;

}


// Sort tasks

sortTasks.addEventListener("change", renderTasks);


// Initial render

renderTasks();


// =========================
// 4. FOCUS TIMER
// =========================

const timerDisplay = document.getElementById("timer-display");

const startButton = document.getElementById("start-timer");
const stopButton = document.getElementById("stop-timer");
const resetButton = document.getElementById("reset-timer");

const timerStatus = document.getElementById("timer-status");

const progressBar = document.getElementById("timer-progress-bar");


const FOCUS_TIME = 25 * 60;

let timeLeft = FOCUS_TIME;

let timerInterval = null;


// Display timer

function updateTimerDisplay() {

    const minutes = Math.floor(timeLeft / 60);

    const seconds = timeLeft % 60;

    timerDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;


    // Update progress bar

    const progress = (
        (FOCUS_TIME - timeLeft) / FOCUS_TIME
    ) * 100;

    progressBar.style.width = `${progress}%`;

}


// Start timer

startButton.addEventListener("click", function() {

    // Prevent multiple intervals

    if (timerInterval !== null) return;

    if (timeLeft <= 0) return;

    timerStatus.textContent = "FOCUSING";

    timerInterval = setInterval(function() {

        timeLeft--;

        updateTimerDisplay();


        // Timer finished

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            timerInterval = null;

            timerStatus.textContent = "COMPLETED";

            alert("Focus session completed! Great work.");

        }

    }, 1000);

});


// Stop / Pause timer

stopButton.addEventListener("click", function() {

    if (timerInterval !== null) {

        clearInterval(timerInterval);

        timerInterval = null;

        timerStatus.textContent = "PAUSED";

    }

});


// Reset timer

resetButton.addEventListener("click", function() {

    clearInterval(timerInterval);

    timerInterval = null;

    timeLeft = FOCUS_TIME;

    timerStatus.textContent = "READY";

    updateTimerDisplay();

});


// Initial timer display

updateTimerDisplay();


// =========================
// 5. QUICK LINKS
// =========================

const linkForm = document.getElementById("link-form");

const linkName = document.getElementById("link-name");

const linkUrl = document.getElementById("link-url");

const linkList = document.getElementById("quick-link-list");

const linkMessage = document.getElementById("link-message");


let links = getStorage(STORAGE_KEYS.links, []);

if (!Array.isArray(links)) {
    links = [];
}


function saveLinks() {

    saveStorage(STORAGE_KEYS.links, links);

}


// Add new link

linkForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = linkName.value.trim();

    const url = linkUrl.value.trim();


    if (!name || !url) return;


    // Validate URL

    let validUrl;

    try {

        validUrl = new URL(url);

        if (
            validUrl.protocol !== "https:" &&
            validUrl.protocol !== "http:"
        ) {
            throw new Error("Invalid protocol");
        }

    } catch (error) {

        linkMessage.textContent = "Please enter a valid website URL.";

        return;

    }


    // Prevent duplicate links

    const duplicate = links.some(link =>
        link.url === validUrl.href ||
        link.name.toLowerCase() === name.toLowerCase()
    );


    if (duplicate) {

        linkMessage.textContent = "This link already exists.";

        return;

    }


    // Create link object

    const newLink = {
        id: crypto.randomUUID(),
        name: name,
        url: validUrl.href
    };


    links.push(newLink);

    saveLinks();

    renderLinks();

    linkForm.reset();

    linkMessage.textContent = "";

});


// Render quick links

function renderLinks() {

    linkList.innerHTML = "";


    links.forEach(function(link) {

        const item = document.createElement("article");

        item.className = "quick-link-item";


        // Website anchor

        const anchor = document.createElement("a");

        anchor.textContent = link.name;

        anchor.href = link.url;

        anchor.target = "_blank";

        anchor.rel = "noopener noreferrer";


        // Delete button

        const removeButton = document.createElement("button");

        removeButton.type = "button";

        removeButton.className = "remove-link";

        removeButton.textContent = "×";

        removeButton.setAttribute(
            "aria-label",
            `Remove ${link.name}`
        );


        item.append(anchor, removeButton);

        linkList.appendChild(item);


        // Remove link

        removeButton.addEventListener("click", function() {

            links = links.filter(item =>
                item.id !== link.id
            );

            saveLinks();

            renderLinks();

        });

    });

}


// Initial render

renderLinks();


// =========================
// 6. INITIALIZATION
// =========================

console.log("Daily Space Dashboard is ready!");