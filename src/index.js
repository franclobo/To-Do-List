// import { add } from 'lodash';

import { forEach } from 'lodash';
import './style.css';

// This code is based on the videos: https://www.youtube.com/watch?v=ePzOFu2xXUQ and https://www.youtube.com/watch?v=MkESyVB4oUw&t=1904s
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
  list = [
    {
      description: 'Morning session',
      completed: false,
      index: 0,
    },
    {
      description: 'Collaborative session 1',
      completed: false,
      index: 1,
    },
    {
      description: 'Breack',
      completed: false,
      index: 2,
    }
  ];
  newLists.forEach((newList) => {
    list.push({
      description: toDoTasks.description,
      completed: newList.classList.contains('checked'),
      index: list.length,
    });
  });
  localStorage.setItem('list', JSON.stringify(list));
};

const toDoList = (task) => {
  toDoTasks.description = addNew.value;
  let newTask = toDoTasks.description;
  if (newTask.length < 1) return;
 
  const newList = document.createElement('li');
  if (task && task.completed) {
    newList.classList.add('checked');
  };
  const taskInput = document.createElement('input');
  taskInput.classList.add('text');
  taskInput.type = 'text';
  taskInput.value = toDoTasks.description;
  taskInput.setAttribute('readonly', 'readonly');
  newList.appendChild(taskInput);
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

  taskInput.addEventListener('dblclick', () => {
    newList.classList.toggle('hidden');
    if (newList.classList.contains('hidden')){
      taskInput.removeAttribute('readonly');
      taskInput.focus();
    } else {
      taskInput.removeAttribute('readonly', 'readonly');
      toDoTasks.description = taskInput.value;
      updateLocalStorage();
    }; 
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
