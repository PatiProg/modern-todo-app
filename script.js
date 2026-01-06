const addBtn = document.getElementById("addBtn");
const todoText = document.getElementById("todo-text");
const todoArea = document.getElementById("todos");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// ---------- Render ----------
function renderTodos() {
  // Überschrift behalten
  todoArea.innerHTML = "<h1>ToDos</h1>";

  todos.forEach((todo, index) => {
    const todoDiv = document.createElement("div");
    todoDiv.className = "todo";
    todoDiv.style.display = "flex";
    todoDiv.style.alignItems = "center";
    todoDiv.style.gap = "12px";
    const text = document.createElement("span");
    text.textContent = todo.text;
    text.style.textDecoration = todo.done ? "line-through" : "none";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;

    checkbox.addEventListener("change", () => {
      todos[index].done = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "✕";

    delBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    const left = document.createElement("div");
    left.style.display = "flex";
    left.style.alignItems = "center";
    left.style.gap = "12px";

    left.append(checkbox, text);
    todoDiv.append(left, delBtn);

    todoArea.appendChild(todoDiv);
  });
}

// ---------- Save ----------
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// ---------- Add ----------
addBtn.addEventListener("click", () => {
  if (todoText.value === "") return;

  todos.push({
    text: todoText.value,
    done: false,
  });

  todoText.value = "";
  saveTodos();
  renderTodos();
});

// ---------- Enter ----------
todoText.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBtn.click();
});

// ---------- Init ----------
renderTodos();
