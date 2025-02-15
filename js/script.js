const tbody = document.querySelector(".tbody");
const btnOption = document.getElementById("btnOption");
const taskName = document.getElementById("taskName");
const dateInput = document.getElementById("date");
const btnAddList = document.getElementById("btnAddList");

const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

// Load tasks from localStorage (or set default tasks)
let data = JSON.parse(localStorage.getItem("tasks")) || [
    { name: "Java", dueDate: currentDate, priority: "Low", status: "Pending" },
    { name: "Database", dueDate: currentDate, priority: "High", status: "Pending" },
    { name: "Web Application", dueDate: currentDate, priority: "Medium", status: "Pending" }
];

// ✅ Function to Save Data to localStorage
function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(data));
}

// ✅ Function to Display All Tasks
function displayAllTask() {
    tbody.innerHTML = ""; // Clear table before re-rendering

    data.forEach((task, index) => {
        let tr = document.createElement("tr");
        tr.className = "bg-white border-b border-gray-200";

        let taskNameTd = document.createElement("td");
        taskNameTd.className = "px-6 py-4 whitespace-nowrap";
        taskNameTd.textContent = task.name;

        let taskDateTd = document.createElement("td");
        taskDateTd.className = "px-6 py-4";
        taskDateTd.textContent = task.dueDate;

        let priorityTd = document.createElement("td");
        priorityTd.className = `px-6 py-4 font-bold ${
            task.priority === "Low" ? "text-green-500" :
            task.priority === "High" ? "text-red-500" :
            "text-orange-500"
        }`;
        priorityTd.textContent = task.priority;

        let actionTd = document.createElement("td");
        actionTd.className = "px-6 py-4 text-right";

        let btnStatus = document.createElement("button");
        btnStatus.className = `btnStatus font-medium cursor-pointer transition-transform ease-in-out px-6 py-2 rounded-lg ${
            task.status === "Pending" ? "bg-orange-400 text-white" : "bg-green-400 text-white"
        }`;
        btnStatus.textContent = task.status;
        btnStatus.setAttribute("data-index", index);

        // ✅ Event Listener to Toggle Status and Save to localStorage
        btnStatus.addEventListener("click", function () {
            let taskIndex = btnStatus.getAttribute("data-index");

            data[taskIndex].status = data[taskIndex].status === "Pending" ? "Completed" : "Pending";
            saveToLocalStorage();
            displayAllTask(); // Re-render UI
        });

        actionTd.appendChild(btnStatus);
        tr.appendChild(taskNameTd);
        tr.appendChild(taskDateTd);
        tr.appendChild(priorityTd);
        tr.appendChild(actionTd);

        tbody.appendChild(tr);
    });
}

// ✅ Function to Add a New Task
btnAddList.addEventListener("click", function (e) {
    e.preventDefault();
    let newTaskName = taskName.value;
    let newDate = dateInput.value;
    let newPriority = btnOption.value;

    // ✅ Input Validation
    if (newTaskName === "" || newPriority === "none") {
        alert("Please fill in all fields!");
        return;
    }
    if (newDate > currentDate) {
        alert("The due date cannot be in the future!");
        return;
    }

    // ✅ Add new task to data array
    data.push({
        name: newTaskName,
        dueDate: newDate,
        priority: newPriority,
        status: "Pending"
    });

    // ✅ Save to localStorage and refresh UI
    saveToLocalStorage();
    displayAllTask();

    // ✅ Clear input fields
    taskName.value = "";
    dateInput.value = "";
    btnOption.value = "none";
});

// ✅ Load Data from localStorage on Page Load
document.addEventListener("DOMContentLoaded", displayAllTask);
