import { updateLocalStorage, toDoTasks } from './class.js';

import { addNew } from '../index.js'

const container = document.querySelector('.list');
const clearAll = document.querySelector('.clear');
export const toDoList = (task) => {
  let newTask = addNew.value;
  if (task) {
    newTask = task.description;
  }
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