document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask(category) {
    const input = document.getElementById(`${category}-input`);
    const task = input.value.trim();

    if (task === '') {
        alert('할 일을 입력하세요');
        return;
    }

    const list = document.getElementById(`${category}-list`);
    const listItem = document.createElement('li');
    listItem.textContent = task;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = () => {
        listItem.remove();
        saveTasks();
    };

    listItem.appendChild(deleteButton);
    list.appendChild(listItem);

    input.value = '';
    saveTasks();
}

function saveTasks() {
    const tasks = {
        'important-urgent': [],
        'important-not-urgent': [],
        'not-important-urgent': [],
        'not-important-not-urgent': []
    };

    for (const category in tasks) {
        const listItems = document.querySelectorAll(`#${category}-list li`);
        listItems.forEach(item => {
            tasks[category].push(item.firstChild.textContent);
        });
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || {
        'important-urgent': [],
        'important-not-urgent': [],
        'not-important-urgent': [],
        'not-important-not-urgent': []
    };

    for (const category in tasks) {
        tasks[category].forEach(task => {
            const list = document.getElementById(`${category}-list`);
            const listItem = document.createElement('li');
            listItem.textContent = task;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '삭제';
            deleteButton.className = 'delete-button';
            deleteButton.onclick = () => {
                listItem.remove();
                saveTasks();
            };

            listItem.appendChild(deleteButton);
            list.appendChild(listItem);
        });
    }
}
