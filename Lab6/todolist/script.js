const form = document.querySelector("form");
const todoInput = document.querySelector("#todo-input");
const addButton = document.querySelector("#add-button");
const todoList = document.querySelector("#todo-list");

let todos = [];

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText.length > 0 && todoText.length <= 50) {
    const todo = {
      id: Date.now(),
      text: todoText,
      completed: false,
    };

    todos.push(todo);

    todoInput.value = "";

    renderTodos();
  } else if (todoText.length > 50) {
    alert("Task cannot exceed 50 characters.");
  }
}

function deleteTodo(id) {
  const confirmDelete = confirm("Are you sure you want to delete this task?");
  if (confirmDelete) {
    todos = todos.filter((todo) => todo.id !== id);
    renderTodos();
  }
}

function toggleCompleted(id) {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      todo.completed = !todo.completed;
    }
    return todo;
  });
  renderTodos();
}

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const todoItem = document.createElement("li");
    const todoText = document.createElement("span");
    const todoDeleteButton = document.createElement("button");
    const todoCheckbox = document.createElement("input");

    // Create checkbox and set properties
    todoCheckbox.type = "checkbox";
    todoCheckbox.checked = todo.completed;

    // Event listener for checkbox to toggle completed state
    todoCheckbox.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent event from bubbling up and triggering the li click
      toggleCompleted(todo.id);
    });

    todoText.textContent = todo.text;
    todoDeleteButton.textContent = "Delete";

    // Event listener for delete button to trigger deletion
    todoDeleteButton.addEventListener("click", (event) => {
      event.stopPropagation();  // Prevent the click event from propagating to the li element
      deleteTodo(todo.id);
    });

    if (todo.completed) {
      todoItem.classList.add("completed");
      todoText.style.textDecoration = "line-through"; // Add line-through when task is completed
    }

    // Add checkbox, text, and delete button to the todo item
    todoItem.appendChild(todoCheckbox);
    todoItem.appendChild(todoText);
    todoItem.appendChild(todoDeleteButton);

    // Add todo item to the list
    todoList.appendChild(todoItem);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addTodo();
});

renderTodos();
