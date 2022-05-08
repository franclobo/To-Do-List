import _ from 'lodash';
import "./style.css";
const formList = document.querySelector(".form");
const addNew = document.querySelector(".input");
const container = document.querySelector(".list");
const clearAll = document.querySelector(".clear");
const upDate = document.querySelector(".refresh");

let list = JSON.parse(localStorage.getItem("list"));
if (list) {
  list.forEach((task) => {
    toDoList(task);
  });
}

formList.addEventListener("submit", (event) => {
  event.preventDefault();
  toDoList();
});

toDoList = (task) => {
  let newTask = addNew.value;
  if (task) {
    newTask = task.name;
  }

  const liEl = document.createElement("li");
  if (task && task.completed) {
    liEl.classList.add("checked");
  }
  liEl.innerText = newTask;
  container.appendChild(liEl);
  addNew.value = "";
  const checkBtnEl = document.createElement("div");
  checkBtnEl.innerHTML = `
  <i class="fas fa-check-square">
  `;
  liEl.appendChild(checkBtnEl);
  const trashBtnEl = document.createElement("div");
  trashBtnEl.innerHTML = `
  <i class="fas fa-trash"></i>
  `;
  liEl.appendChild(trashBtnEl);

  checkBtnEl.addEventListener("click", () => {
    liEl.classList.toggle("checked");
    updateLocalStorage();
  });

  trashBtnEl.addEventListener("click", () => {
    liEl.remove();
    updateLocalStorage();
  });

  clearAll.addEventListener("click", () => {
    if (liEl.classList.contains("checked")) {
      liEl.remove();
      updateLocalStorage();
    }
  });

  upDate.addEventListener("click", updateLocalStorage());

  updateLocalStorage();
}

updateLocalStorage = () => {
  const liEls = document.querySelectorAll("li");
  list = [];
  liEls.forEach((liEl) => {
    list.push({
      name: liEl.innerText,
      completed: liEl.classList.contains("checked"),
    });
  });
  localStorage.setItem("list", JSON.stringify(list));
}