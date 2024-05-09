let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDate');

    const task = {
        name: taskInput.value,
        dueDate: new Date(dueDateInput.value),
        completed: false
    };

    tasks.push(task);
    taskInput.value = '';
    dueDateInput.value = '';

    displayTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    let completedTasks = 0;
    const currentDate = new Date();
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        let taskDescription = task.name + ' - ' + task.dueDate.toLocaleString();
        if (task.completed) {
            listItem.classList.add('completed');
            completedTasks++;
            taskDescription = `<span style="color: green; text-decoration: line-through;">${taskDescription}</span>`;
        } else if (task.dueDate < currentDate) {
            listItem.style.color = 'red';
            taskDescription = 'Overdue - ' + taskDescription;
        }
        listItem.innerHTML = taskDescription;

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleTask(index);
            displayTasks(); // Update the display after marking as complete
        });
        listItem.appendChild(completeButton);

        listItem.addEventListener('click', () => toggleTask(index));
        taskList.appendChild(listItem);
    });

    const completionPercentage = document.getElementById('completionPercentage');
    const percentage = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
    completionPercentage.innerHTML = `<div class="completion-circle">${percentage}%</div>`;
}

displayTasks();

// document.addEventListener('DOMContentLoaded', function() {
//     const taskForm = document.getElementById('taskForm');
//     const taskInput = document.getElementById('taskInput');
//     const taskDateTime = document.getElementById('taskDateTime');
//     const taskList = document.getElementById('taskList');
//     const completionCircle = document.getElementById('completionCircle');

//     let tasks = [];

//     // Add task
//     taskForm.addEventListener('submit', function(event) {
//         event.preventDefault();
//         if (taskInput.value.trim() === '' || taskDateTime.value.trim() === '') return;
//         const task = {
//             id: Date.now(),
//             text: taskInput.value.trim(),
//             datetime: taskDateTime.value,
//             completed: false
//         };
//         tasks.push(task);
//         renderTasks();
//         taskInput.value = '';
//         taskDateTime.value = '';
//     });

//     // Delete task
//     taskList.addEventListener('click', function(event) {
//         if (event.target.classList.contains('delete-button')) {
//             const taskId = parseInt(event.target.parentNode.dataset.id);
//             tasks = tasks.filter(task => task.id !== taskId);
//             renderTasks();
//         }
//     });

//     // Render tasks
//     function renderTasks() {
//         taskList.innerHTML = '';
//         tasks.forEach(task => {
//             const taskItem = document.createElement('li');
//             taskItem.dataset.id = task.id;
//             const taskText = document.createElement('span');
//             taskText.textContent = task.text;
//             if (task.completed) {
//                 taskText.classList.add('completed');
//             }
//             const deleteButton = document.createElement('button');
//             deleteButton.textContent = 'Delete';
//             deleteButton.classList.add('delete-button');
//             taskItem.appendChild(taskText);
//             taskItem.appendChild(deleteButton);
//             taskList.appendChild(taskItem);
//         });
//         calculateCompletion();
//     }

//     // Calculate completion percentage
//     function calculateCompletion() {
//         const completedTasks = tasks.filter(task => task.completed).length;
//         const totalTasks = tasks.length;
//         const completionPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
//         completionCircle.textContent = completionPercentage + '%';
//     }

// });
