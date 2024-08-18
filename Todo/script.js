const formTodo = document.querySelector(".todo-form");
const formTodoText = document.querySelector(".todo-form input[id='add']");
const formTodoCat = document.querySelector(".todo-form input[id='cat']");
const todoList = document.querySelector(".todo-list");
const category = document.querySelector(".categories");
let tasks = [];
let categories = [];

formTodo.addEventListener("submit", (e) => {
    e.preventDefault();
    const cateGory = formTodoCat.value.trim();
    const newTodoText = formTodoText.value.trim();
    if (newTodoText === "") return;

    const newLi = document.createElement("li");
    newLi.innerHTML = `<span class="text">${newTodoText}</span>
                <div class="todo-buttons">
                    <button class="todo-btn done">Done</button>
                    <button class="todo-btn remove">Remove</button>
                </div>`;
    newLi.setAttribute("data-category", cateGory); // Associate task with its category
    todoList.append(newLi);

    // Store task in tasks array
    tasks.push({ text: newTodoText, category: cateGory });

    // Update categories
    if (cateGory && !categories.includes(cateGory)) {
        categories.push(cateGory);
        updateCategory();
    }

    formTodoText.value = "";
    formTodoCat.value = "";
});

function updateCategory() {
    category.innerHTML = ''; // Clear current category buttons

    // "All Categories" button
    const allBtn = document.createElement("button");
    allBtn.textContent = "All Categories";
    allBtn.classList.add("btn-cat");
    allBtn.addEventListener("click", () => showTasksByCategory(""));
    category.appendChild(allBtn);

    // Create a button for each category
    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.textContent = cat;
        btn.classList.add("btn-cat");
        btn.addEventListener("click", () => showTasksByCategory(cat));
        category.appendChild(btn);
    });
}

function showTasksByCategory(selectedCategory) {
    const allTasks = todoList.querySelectorAll("li");

    allTasks.forEach(task => {
        const taskCategory = task.getAttribute("data-category");
        if (selectedCategory === "" || taskCategory === selectedCategory) {
            task.style.display = "flex"; // Show task
        } else {
            task.style.display = "none"; // Hide task
        }
    });
}

function removeTask(categoryToRemove) {
    // Remove the category from the categories array
    categories = categories.filter(cat => cat !== categoryToRemove);
    updateCategory(); // Update category buttons
    showTasksByCategory(""); // Show all tasks after removing a category
}

todoList.addEventListener("click", (e) => {
    if (e.target.classList.contains("done")) {
        const spanText = e.target.parentNode.previousElementSibling;
        spanText.style.textDecoration = "line-through";
    };
    if (e.target.classList.contains("remove")) {
        const removeText = e.target.parentNode.parentNode;
        const taskCategory = removeText.getAttribute("data-category");
        
        // Remove the task from the tasks array
        tasks = tasks.filter(task => task.text !== removeText.querySelector(".text").textContent || task.category !== taskCategory);

        // Remove the task from the DOM
        removeText.remove();

        // Check if the category needs to be removed
        if (!tasks.some(task => task.category === taskCategory)) {
            removeTask(taskCategory);
        }
    };
});
