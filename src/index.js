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
  const newList = document.createElement('li');
  if (task && task.completed) {
    newList.classList.add('checked');
  }
  const taskInput = document.createElement('input');
  newList.appendChild(taskInput);
  taskInput.classList.add('text');
  taskInput.type = 'text';
  if (newTask.length > 0) {
    taskInput.value = newTask;
  }
  taskInput.setAttribute('readonly', 'readonly');
  toDoTasks.description = taskInput.value;
  container.appendChild(newList);
  addNew.value = '';

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

  newList.addEventListener('dblclick', () => {
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
  if(addNew.value.length > 0) {
    toDoList();
  }  
});
formList.addEventListener('submit', (event) => {
  event.preventDefault();
  toDoList();
});

addNew.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && addNew.value.length > 0) {
    e.preventDefault();
    toDoList();
  }
});

window.addEventListener('load', () => {
  if (list) {
    list.forEach((task) => {
      toDoList(task);
    });
  };
})