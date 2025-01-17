const inputbox = document.querySelector(".inputbox input");
const addButton = document.querySelector("#addbutton");
const taskList = document.querySelector(".itemlist");
const totalCount = document.querySelector(".total-count");
const completedCount = document.querySelector(".completed-count");
const uncompletedCount = document.querySelector(".uncompleted-count");

let tasks = [];

const updateTaskList = () => {
  taskList.innerHTML = tasks
    .map(
      (task, index) => `
        <li class="${task.completed ? "completed" : ""}">
            <i class="uil ${
                task.completed ? "uil-check-circle" : "uil-circle"
            } status-icon" onclick="toggleTaskStatus(${index})"></i>
            <span>${task.name}</span>
            <div>
                <i class="uil uil-edit" onclick="editTask(${index})"></i>
                <i class="uil uil-trash-alt" onclick="deleteTask(${index})"></i>
            </div>
        </li>`
    )
    .join("");

  if (tasks.length === 0) {
    taskList.innerHTML = `<p class='empty-message'>No tasks yet. Start by adding one!</p>`;
  }

  updateCounters();
};

const updateCounters = () => {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const uncompleted = total - completed;

  totalCount.textContent = total;
  completedCount.textContent = completed;
  uncompletedCount.textContent = uncompleted;
};

const addTask = () => {
  const taskName = inputbox.value.trim();
  if (taskName) {
    tasks.push({
      name: taskName,
      completed: false
    });
    inputbox.value = "";
    updateTaskList();
  }
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTaskList();
};

const editTask = (index) => {
  const newTask = prompt("Edit your task:", tasks[index].name);
  if (newTask && newTask.trim()) {
    tasks[index].name = newTask.trim();
    updateTaskList();
  }
};

const toggleTaskStatus = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
};

addButton.addEventListener("click", addTask);

inputbox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

updateTaskList();