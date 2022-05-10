export const list = JSON.parse(localStorage.getItem('list')) || [];

export class ToDoTasks {
  constructor(description = '', completed = false, index = null) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

export const toDoTasks = new ToDoTasks();

export const updateLocalStorage = () => {
  const newLists = document.querySelectorAll('li');
  const list = [];
  newLists.forEach((newList) => {
    list.push({
      description: toDoTasks.description,
      completed: newList.classList.contains('checked'),
      index: list.length,
    });
  });
  localStorage.setItem('list', JSON.stringify(list));
};