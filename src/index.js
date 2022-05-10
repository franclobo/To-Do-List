// import { add } from 'lodash';

import './style.css';

// This code is based on the video: https://www.youtube.com/watch?v=ePzOFu2xXUQ
// and adapted to the Microverse requirements.

const formList = document.querySelector('.form');
const addNew = document.querySelector('.input');
const container = document.querySelector('.list');
const clearAll = document.querySelector('.clear');
const upDate = document.querySelector('.refresh');
let list = JSON.parse(localStorage.getItem('list')) || [];

class ToDoTasks {
  constructor(description = '', completed = false, index = null) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

const toDoTasks = new ToDoTasks();

const updateLocalStorage = () => {
  const newLists = document.querySelectorAll('li');
  list = [];
  newLists.forEach((newList) => {
    list.push({
      description: newList.innerText,
      completed: newList.classList.contains('checked'),
      index: list.length + 1,
    });
  });
  localStorage.setItem('list', JSON.stringify(list));
};

const toDoList = (task) => {
  let newTask = addNew.value;
  if (newTask.length < 1) return;
  if (task) {
    newTask = toDoTasks.description;
  }

  const newList = document.createElement('li');
  if (task && task.completed) {
    newList.classList.add('checked');
  }
  const taskInput = document.createElement('input');
  taskInput.classList.add('text');
  taskInput.type = 'text';
  taskInput.value = newTask;
  taskInput.setAttribute('readonly', 'readonly');
  newList.appendChild(taskInput);
  addNew.value = '';

  const checkBtnEl = document.createElement('div');
  checkBtnEl.innerHTML = `
  <i class="fas fa-check-square"></i>
  `;
  newList.appendChild(checkBtnEl);
  container.appendChild(newList);
  const trashBtnEl = document.createElement('div');
  trashBtnEl.innerHTML = `
  <i class="fas fa-trash"></i>
  `;
  newList.appendChild(trashBtnEl);
  const editBtnEl = document.createElement('div');
  editBtnEl.innerHTML = `
  <i class="fas fa-solid fa-ellipsis-vertical"></i>
  `;
  newList.appendChild(editBtnEl);

  checkBtnEl.addEventListener('click', () => {
    newList.classList.toggle('checked');
    updateLocalStorage();
  });

  trashBtnEl.addEventListener('click', () => {
    newList.remove();
    updateLocalStorage();
  });

  clearAll.addEventListener('click', () => {
    if (newList.classList.contains('checked')) {
      newList.remove();
      updateLocalStorage();
    }
  });

  taskInput.addEventListener('dblclick', () => {
    newList.classList.toggle('hidden');
    if (newList.classList.contains('hidden')){
      taskInput.removeAttribute('readonly');
      taskInput.focus();
    } else {
      taskInput.removeAttribute('readonly', 'readonly');
      updateLocalStorage();
    }    
  })

  updateLocalStorage();
};

upDate.addEventListener('click', () => {
  toDoList();
});

formList.addEventListener('submit', (event) => {
  event.preventDefault();
  toDoList();
});