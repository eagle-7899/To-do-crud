const formCreate = document.querySelector("#form-create");
const formEdit = document.querySelector("#form-edit");
const listGroupTodo = document.querySelector("#list-group-todo");
// const messageCreate = document.querySelector('#message-create')
const time = document.querySelector("#time");
const modal = document.querySelector("#modal");
const overlay = document.querySelector("#overlay");

//time elements
const fullDay = document.querySelector("#full-day");
const hourEl = document.querySelector(`#hour`);
const minuteEl = document.querySelector("#minute");
const secondEl = document.querySelector("#second");
const millisecondEl = document.querySelector("#milisecond");

// iteamedit
let editIteam;

// check
let todos = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];

//showmessage

function showMessage(where, message) {
  document.getElementById(`${where}`).textContent = `${message}`;
  setTimeout(() => {
    document.getElementById(`${where}`).textContent = ``;
  }, 1500);
}

function showTodos() {
  const todos = JSON.parse(localStorage.getItem(`list`)) || [];
  listGroupTodo.innerHTML = "";
  todos.forEach((todo, i) => {
    listGroupTodo.innerHTML += `
            <li ondblClick = "setCompleted(${i})" class="list-group-item d-flex ${todo.completed == true ? "completed" : ""} justify-content-between align-items-center"> ${todo.text}
                <div class="todos-icon">
                <span class="opacity-50 me-2">${todo.date}</span>
                <img onClick = "editTodos(${i})" src="img/edit.svg" alt="edit svg" width="20" height="20">
                <img onClick = "deleteTodos(${i})" src="img/delete.svg" alt="deleyte svg" width="20" height="20">
                </div>
            </li>
            `;
  });
}
showTodos();

//time
function getTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month =
    now.getMonth() + 1 < 10 ? `0` + (now.getMonth() + 1) : `0` + now.getMonth();
  const date = now.getDate() < 10 ? `0` + now.getDate() : now.getDate();

  // hours
  const hour = now.getHours() < 10 ? `0` + now.getHours() : now.getHours();
  const minute =
    now.getMinutes() < 10 ? `0` + now.getMinutes() : now.getMinutes();
  const second =
    now.getSeconds() < 10 ? `0` + now.getSeconds() : now.getSeconds();
  const millisecond = now.getMilliseconds();

  // sarlavha soati
  hourEl.textContent = hour;
  minuteEl.textContent = minute;
  secondEl.textContent = second;
  millisecondEl.textContent = millisecond;

  return `${hour}:${minute},${date}.${month}.${year}`;
}
//doimiy ishlashi uchun
setInterval(() => {
  getTime();
}, 1);

//local storagega joylash
function setTodos() {
  localStorage.setItem("list", JSON.stringify(todos));
}

formCreate.addEventListener("submit", (e) => {
  e.preventDefault();

  const todosText = formCreate["input-create"].value.trim();
  if (todosText.length) {
    todos.push({ text: todosText, date: getTime(), completed: false });
    setTodos();
    formCreate.reset();
    showTodos();
  } else {
    // messageCreate.textContent = 'Biror nima yozing'
    showMessage("message-create", "Biror nima yozing");
  }
});

function deleteTodos(id) {
  const deleteTodo = todos.filter((todo, i) => {
    return id !== i;
  });
  todos = deleteTodo;
  setTodos();
  showTodos();
}

//completed
function setCompleted(id) {
  const setCoplited = todos.map((todo, i) => {
    if (id == i) {
      return { ...todo, completed: !todo.completed };
    } else {
      return { ...todo };
    }
  });
  todos = setCoplited;
  setTodos();
  showTodos();
}

//editform
formEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  const todosText = formEdit["change-input"].value.trim();
  if (todosText.length) {
    todos.splice(editIteam, 1, {
      text: todosText,
      date: getTime(),
      completed: false,
    });
    setTodos();
    formEdit.reset();
    showTodos();
    closeTodos();
  } else {
    showMessage("change-error", "Biror nima yozing");
  }
});

// edit todos
function editTodos(id) {
  openTodos(id);
  editIteam = id;
}

function openTodos(id) {
  todos.map((todo, i) => {
    if (id === i) {
      overlay.classList.remove("hidden");
      modal.classList.remove("hidden");
    }
  });
}
overlay.addEventListener("click", closeTodos);
// close modal
function closeTodos() {
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
}
