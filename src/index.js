// import { add } from 'lodash';

// import { forEach } from 'lodash';
import './style.css';

import { updateLocalStorage, toDoTasks, list } from './modules/class.js';

// This code is based on the videos: https://www.youtube.com/watch?v=ePzOFu2xXUQ and https://www.youtube.com/watch?v=MkESyVB4oUw&t=1904s
// and adapted to the Microverse requirements.

const formList = document.querySelector('.form');
const addNew = document.querySelector('.input');
const container = document.querySelector('.list');
const clearAll = document.querySelector('.clear');
const upDate = document.querySelector('.refresh');

const toDoList = (task) => {
  
  const newTask = addNew.value;
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
  taskInput.value = newList.innerText;
  taskInput.setAttribute('readonly', 'readonly');
  newList.appendChild(taskInput);
  newList.innerText = newTask;
  addNew.value = '';
  container.appendChild(newList);

  const checkBtnEl = document.createElement('div');
  checkBtnEl.innerHTML = `
  <i class="fas fa-check-square"></i>
  `;
  newList.appendChild(checkBtnEl);

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

  container.addEventListener('dblclick', () => {
    newList.classList.toggle('hidden');
    if (newList.classList.contains('hidden')) {
      taskInput.removeAttribute('readonly');
      taskInput.focus();
    } else {
      taskInput.removeAttribute('readonly', 'readonly');
      updateLocalStorage();
    }
  });

  updateLocalStorage();
};

upDate.addEventListener('click', () => {
  toDoList();
});

formList.addEventListener('submit', (event) => {
  event.preventDefault();
  toDoList();
});

if (list) {
  list.forEach((task) => {
    toDoList(task);
  });
};

const checkStorage = () => {
  return list ? JSON.parse(list) : [];
};

window.addEventListener('load', () => {
  const defaultList = checkStorage();
  console.log(defaultList);
  if (defaultList.length > 0) {
    defaultList.forEach((task) => {
      toDoList(task);
    });
  }
});