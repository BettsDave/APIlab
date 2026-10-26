const taskForm = document.getElementById('task-form'); 
const taskInput = document.getElementById('task-input'); 
const taskList = document.getElementById('task-list'); 
const message = document.getElementById('message'); 
  
// Load and display all tasks 
async function fetchTasks() { 
    // TODO: 
    try { 
        const response = await fetch('/api/tasks'); 
        if (!response.ok) { 
            throw new Error(`Tasks unable to load (${response.status})`); 
        } 
        const tasks = await response.json(); 
        taskList.replaceChildren(); 
  
        tasks.forEach(task => { 
            const row = document.createElement('div'); 
            row.className = 'task-item'; 
  
            const title = document.createElement('span'); 
            title.textContent = task.title; 
  
            const deleteButton = document.createElement('button'); 
            deleteButton.type = 'button'; 
            deleteButton.textContent = 'Delete'; 
            deleteButton.setAttribute('aria-label', `Delete ${task.title}`); 
            deleteButton.addEventListener('click', () => deleteTask(task.id)); 
  
            row.append(title, deleteButton); 
            taskList.appendChild(row); 
        }); 
        message.textContent = ''; 
    } catch (error) { 
        console.error('Error fetching tasks:', error); 
        message.textContent = 'Tasks unable to load. Check the server and try again.'; 
    } 
} 
  
// Create a task when the form is submitted 
taskForm.addEventListener('submit', async (event) => { 
    event.preventDefault(); 
    const title = taskInput.value.trim(); 
    // TODO: 
    if (!title) { 
        message.textContent = 'Enter a title first.'; 
        return; 
    } 
  
    try { 
        const response = await fetch('/api/tasks', { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ title }) 
        }); 
        const result = await response.json(); 
        if (!response.ok) { 
            throw new Error(result.message || 'Task unable to add'); 
        } 
        taskInput.value = ''; 
        message.textContent = 'Task added.'; 
        await fetchTasks(); 
    } catch (error) { 
        console.error('Error adding task:', error); 
        message.textContent = 'Task unable to add. Check the server and try again.'; 
    } 

}); 
  
// Delete one task 
async function deleteTask(id) { 
    // TODO: 
    try { 
        const response = await fetch(`/api/tasks/${id}`, { 
            method: 'DELETE' 
        }); 
        const result = await response.json(); 
        if (!response.ok) { 
            throw new Error(result.message || 'Could not delete task'); 
        } 
        message.textContent = 'Task deleted.'; 
        await fetchTasks(); 
    } catch (error) { 
        console.error('Error deleting task:', error); 
        message.textContent = 'Could not delete task. Check the server and try again.'; 
    } 
} 
  
// Load tasks when the page first opens 
fetchTasks(); 