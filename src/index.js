import './style.css';

const formList = document.querySelector('.form');
const addNew = document.querySelector('.input');
const container = document.querySelector('.list');
const clearAll = document.querySelector('.clear');
const upDate = document.querySelector('.refresh');

const updateLocalStorage = () => {
  const newLists = document.querySelectorAll('li');
  list = [];
  newLists.forEach((newList) => {
    list.push({
      name: newList.innerText,
      completed: newList.classList.contains('checked'),
    });
  });
  localStorage.setItem("list", JSON.stringify(list));
};

const toDoList = (task) => {
  let newTask = addNew.value;
  if (newTask.length < 1) return;
  if (task) {
    newTask = task.name;
  }

  const newList = document.createElement("li");
  if (task && task.completed) {
    newList.classList.add("checked");
  }
  newList.innerText = newTask;
  addNew.value = "";
  const checkBtnEl = document.createElement("div");
  checkBtnEl.innerHTML = `<i class="fas fa-check-square">`;
  newList.appendChild(checkBtnEl);
  container.appendChild(newList);
  const trashBtnEl = document.createElement("div");
  trashBtnEl.innerHTML = `<i class="fas fa-trash"></i>`;
  newList.appendChild(trashBtnEl);

  checkBtnEl.addEventListener("click", () => {
    newList.classList.toggle("checked");
    updateLocalStorage();
  });

  trashBtnEl.addEventListener("click", () => {
    newList.remove();
    updateLocalStorage();
  });

  clearAll.addEventListener("click", () => {
    if (newList.classList.contains("checked")) {
      newList.remove();
      updateLocalStorage();
    }
  });

  upDate.addEventListener("click", updateLocalStorage());

  updateLocalStorage();
}

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