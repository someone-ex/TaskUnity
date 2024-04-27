document.addEventListener("DOMContentLoaded", function () {
    // Array to store tasks
    let tasks = [];

    // Function to add a new task
    function addTask() {
        // Get the task input value
        let taskInput = document.getElementById("taskInput");
        let taskText = taskInput.value.trim();

        // Check if taskText is not empty
        if (taskText !== "") {
            // Add task to the tasks array
            tasks.push({ text: taskText, completed: false });

            // Clear the task input
            taskInput.value = "";

            // Render tasks
            renderTasks();
        }
    }

    // Function to render tasks
    function renderTasks() {
        // Get the task list
        let taskList = document.getElementById("taskList");

        // Clear existing tasks
        taskList.innerHTML = "";

        // Loop through tasks array and add each task to the task list
        tasks.forEach((task, index) => {
            // Create a new list item for the task
            let li = document.createElement("li");

            // Create span for task text
            let span = document.createElement("span");
            span.textContent = task.text;

            // Make task text editable when edit button is clicked
            let editButton = document.createElement("button");
            editButton.textContent = "Completed";
            editButton.classList.add("editButton"); // Add class for styling
            editButton.addEventListener("click", () => {
                // Automatically select the entire task name when edit button is clicked
                selectTaskName(span);
            });

            // Append span and edit button to the list item
            li.appendChild(span);
            li.appendChild(editButton);

            // Add a class to the list item if the task is completed
            if (task.completed) {
                li.classList.add("completed");
            }

            // Add event listener to mark task as completed when clicked
            li.addEventListener("click", () => {
                toggleTaskCompleted(index);
            });

            // Append the list item to the task list
            taskList.appendChild(li);
        });
    }

    // Function to toggle task completed status
    function toggleTaskCompleted(index) {
        // Toggle the completed status of the task at the given index
        tasks[index].completed = !tasks[index].completed;

        // Render tasks to update the display
        renderTasks();
    }

    // Function to select entire task name
    function selectTaskName(span) {
        let range = document.createRange();
        range.selectNodeContents(span);
        let selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }

    // Function to handle task text editing
    function handleEdit(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent line break
            event.target.blur(); // Save changes

            let editedText = event.target.textContent;
            let listItem = event.target.closest("li");
            let index = Array.from(listItem.parentNode.children).indexOf(listItem);

            // Update task text in the tasks array
            tasks[index].text = editedText;

            // Reset selection after editing
            let selection = window.getSelection();
            selection.removeAllRanges();
        }
    }

    // Add event listener to the "Add Task" button
    let addButton = document.getElementById("addButton");
    addButton.addEventListener("click", addTask);

    // Add event listener for task input to handle Enter and Escape keys
    let taskInput = document.getElementById("taskInput");
    taskInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            addTask();
        } else if (event.key === "Escape") {
            taskInput.value = ""; // Clear input field on Escape
        }
    });

    // Add event listener for task text editing
    document.addEventListener("keydown", (event) => {
        // Check if the pressed key is Enter and task text is being edited
        if (event.key === "Enter" && event.target.tagName === "SPAN" && event.target.contentEditable === "true") {
            handleEdit(event);
        }
    });

    // Initial rendering of tasks
    renderTasks();
});
