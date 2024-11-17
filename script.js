 // script.js
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Event listener for adding tasks
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    // Function to add a task
    function addTask(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;
        taskList.appendChild(li);
    }
});

