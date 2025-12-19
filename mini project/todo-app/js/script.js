let tasks = [];
let filter = "all";
function addTask() {
    let input = document.getElementById("taskInput");
    if (input.value.trim() === "") {
        alert("Task cannot be empty");
        return;
    }
    tasks.push({
        text: input.value,
        completed: false
    });
    input.value = "";
    renderTasks();
}
function renderTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    let filteredTasks = tasks
        .map((task, i) => ({ ...task, index: i }))
        .filter(task => {
            if (filter === "completed") return task.completed;
            if (filter === "pending") return !task.completed;
            return true;
        });
    filteredTasks.forEach(task => {
        let li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        let span = document.createElement("span");
        span.innerText = task.text;
        if (task.completed) span.classList.add("completed");
        span.onclick = () => toggleComplete(task.index);

        let btnGroup = document.createElement("div");

        let editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.className = "btn btn-sm btn-info me-1";
        editBtn.onclick = () => editTask(task.index);

        let delBtn = document.createElement("button");
        delBtn.innerText = "Delete";
        delBtn.className = "btn btn-sm btn-danger";
        delBtn.onclick = () => deleteTask(task.index);

        btnGroup.append(editBtn, delBtn);
        li.append(span, btnGroup);
        list.appendChild(li);
    });
    updateCounter();
}
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}
function editTask(index) {
    let newTask = prompt("Edit task", tasks[index].text);
    if (newTask && newTask.trim() !== "") {
        tasks[index].text = newTask;
        renderTasks();
    }
}
function updateCounter() {
    let total = tasks.length;
    let completed = tasks.filter(t => t.completed).length;
    document.getElementById("counter").innerText =
        `Total: ${total} | Completed: ${completed}`;
}
function filterTasks(type) {
    filter = type;
    renderTasks();
}
function toggleTheme() {
    document.body.classList.toggle("dark");
}
