// Retrieve todolist from local storage or create an empty array if it doesn't exist
let todolist = JSON.parse(localStorage.getItem('todolist')) || [];

// Add item to todolist array and update local storage
document.getElementById('add-btn').addEventListener('click', function() {
    let item = {
        name: document.getElementById('item-name').value,
        date: document.getElementById('item-date').value,
        priority: document.getElementById('item-priority').value,
        completed: false
    };

    todolist.push(item);
    localStorage.setItem('todolist', JSON.stringify(todolist));
});

// Display todolist items
function displayTodolist() {
    let todaysTasksList = document.getElementById('todays-tasks-list');
    let futureTasksList = document.getElementById('future-tasks-list');
    let completedTasksList = document.getElementById('completed-tasks-list');
    let today = new Date().toISOString().slice(0, 10);

    todaysTasksList.innerHTML = '';
    futureTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    for (let i = 0; i < todolist.length; i++) {
        let item = todolist[i];
        let itemCard = document.createElement('div');
        itemCard.classList.add('item-card');
        itemCard.innerHTML = `
            <span>${item.name}</span>
            <span>${item.date}</span>
            <span>${item.priority}</span>
            <button class="delete-btn">Delete</button>
            <button class="tick-btn">✔️</button>
        `;

        // Check if item is due today
        if (item.date ===today) {
            itemCard.classList.add('due-today');
            todaysTasksList.appendChild(itemCard);
        }
        // Check if item is due in the future
        else if (item.date > today) {
            futureTasksList.appendChild(itemCard);
        }
        // Check if item is overdue and not completed
        else if (item.date < today && !item.completed) {
            itemCard.classList.add('overdue');
            futureTasksList.appendChild(itemCard);
        }
        // Check if item is completed
        else if (item.completed) {
            completedTasksList.appendChild(itemCard);
        }
    }
}

// Delete item from todolist array and update local storage
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
        let itemCard = e.target.parentNode;
        let itemName = itemCard.querySelector('span').textContent;
        let index = todolist.findIndex(item => item.name === itemName);
        todolist.splice(index, 1);
        localStorage.setItem('todolist', JSON.stringify(todolist));
        itemCard.remove();
    }
});

// Mark item as completed/not completed and update local storage
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('tick-btn')) {
        let itemCard = e.target.parentNode;
        let itemName = itemCard.querySelector('span').textContent;
        let index = todolist.findIndex(item => item.name === itemName);
        todolist[index].completed = !todolist[index].completed;
        localStorage.setItem('todolist', JSON.stringify(todolist));
        displayTodolist();
    }
});

// Initial display of todolist on page load
displayTodolist();