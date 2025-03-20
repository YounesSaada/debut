function allowDrop(event) {
    event.preventDefault();
  }
  
  function drag(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
  }
  
  function drop (event, columnId) {
    event.preventDefault(); 
    console.log('columnId =',columnId);
    const data = event.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(data);
    console.log('draggedElement =' ,draggedElement);
    if(draggedElement) {
        const taskStatus= columnId; 
        updateTaskStatus(data, taskStatus);
        event.target.querySelector(".task-container").appendChild(draggedElement);
    }
    }
  
  function updateTaskStatus(taskId, status) {
    tasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          status: status,
        };
      }
      return task;
    });
    updateLocalStorage();
  }




let tasks = JSON.parse(localStorage.getItem('tasks')) || []; 
document.addEventListener("DOMContentLoaded", renderTasks); 
function renderTasks() {
const columns = ["todo", "inprogress", "done"];
columns.forEach((columnId) => {
const column = document.getElementById(columnId);
column.querySelector(".task-container").innerHTML = "";





tasks.forEach((task) => {
  if (task.status === columnId) {
    const taskElement = createTaskElement(task.content, task.id); 
    column.querySelector(".task-container").appendChild(taskElement);
  }
});
});
}
    





function createTaskElement(content, id) {
    const taskId = id;
    const task = document.createElement("div"); 
    task.id = taskId;
    task.className = "task";
    task.draggable = true;
    task.innerHTML = `${content} 
    <span class="delete-btn" 
    onclick="deleteTask('${taskId}')">
     ❌
    </span>`;

    task.addEventListener("dragstart", drag)

   return task;
}


function addTask (columnId) {
    const taskInput = document.getElementById("taskInput");
    const taskContent = taskInput.value.trim();
    if (taskContent !== "") {
        const newTask = {  
            id: "task" + Date.now(),
            content: taskContent,
            status: columnId,
        };
        tasks.push(newTask);
        updateLocalStorage();
        renderTasks();
        taskInput.value = "";
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);
    updateLocalStorage();
    renderTasks();
}

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

