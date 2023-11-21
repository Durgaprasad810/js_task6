
function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}


function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const tasks = getTasksFromLocalStorage();

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'taskItem';
        listItem.innerHTML = `
            <span>${task}</span>
            <button class="editBtn" onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(listItem);
    });
}


function addTask() {
    const taskInput = document.getElementById('taskInput');
    const newTask = taskInput.value.trim();

    if (newTask !== '') {
        const tasks = getTasksFromLocalStorage();
        tasks.push(newTask);
        saveTasksToLocalStorage(tasks);
        taskInput.value = '';
        renderTasks();
    }
}


function editTask(index) {
    const tasks = getTasksFromLocalStorage();
    const editedTask = prompt('Edit task:', tasks[index]);
    if (editedTask !== null) {
        tasks[index] = editedTask.trim();
        saveTasksToLocalStorage(tasks);
        renderTasks();
    }
}

function deleteTask(index) {
    const tasks = getTasksFromLocalStorage();
    tasks.splice(index, 1);
    saveTasksToLocalStorage(tasks);
    renderTasks();
}


document.getElementById('addTaskBtn').addEventListener('click', addTask);

renderTasks();