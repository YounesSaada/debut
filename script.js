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
    task.innerHTML = `
    <div class="task-content">
        <span>${content}</span>
        <div class="task-buttons">
            <span class="modify-btn" onclick="modifyTask('${taskId}')">✏️</span>
            <span class="delete-btn" onclick="deleteTask('${taskId}')">❌</span>
        </div>
    </div>
`; 
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

function modifyTask(taskId) {
  const taskElement = document.getElementById(taskId);
  if (!taskElement) return;

  // Get task content and buttons
  const contentDiv = taskElement.querySelector(".task-content");
  const contentSpan = contentDiv.querySelector("span"); // Ensure it's inside .task-content
  if (!contentSpan) return; // Prevent errors if not found

  const modifyBtn = taskElement.querySelector(".modify-btn");
  const deleteBtn = taskElement.querySelector(".delete-btn");

  // Create input field
  const input = document.createElement("input");
  input.type = "text";
  input.value = contentSpan.innerText;
  input.className = "edit-input";

  // Create save button (✅)
  const saveBtn = document.createElement("span");
  saveBtn.innerHTML = "✅";
  saveBtn.className = "save-btn";
  saveBtn.onclick = saveEdit;

  // Hide modify & delete buttons
  modifyBtn.style.display = "none";
  deleteBtn.style.display = "none";

  // Replace content with input
  contentDiv.replaceChild(input, contentSpan); // Fix: Ensure contentSpan is inside contentDiv
  taskElement.appendChild(saveBtn); // Append save button

   input.focus(); // Auto-focus

  // Save changes when pressing Enter
  input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
          saveEdit();
      }
  });

  function saveEdit() {
      const newContent = input.value.trim();
      if (newContent) {
          tasks = tasks.map((task) =>
              task.id === taskId ? {
                 ...task
                , content: newContent } : task
          );

          updateLocalStorage();
          renderTasks(); // Re-render tasks to restore normal mode
      }
  }
}





function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

