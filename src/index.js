import './style.css';

import { list } from './modules/class.js';

import { toDoList } from './modules/todolist.js';

// This code is based on the videos: https://www.youtube.com/watch?v=ePzOFu2xXUQ and https://www.youtube.com/watch?v=MkESyVB4oUw&t=1904s
// and adapted to the Microverse requirements.

const formList = document.querySelector('.form');
const upDate = document.querySelector('.refresh');

upDate.addEventListener('click', () => {
  if (addNew.value.length > 0) {
    toDoList();
  }
});
formList.addEventListener('submit', (event) => {
  event.preventDefault();
  toDoList();
});

window.addEventListener('load', () => {
  if (list) {
    list.forEach((task) => {
      toDoList(task);
    });
  }
});