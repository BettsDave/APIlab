const express = require('express'); 
const cors = require('cors'); 
const app = express(); 
const PORT = 3000; 
  
// Middleware: prepare incoming requests and serve frontend files 
app.use(cors()); 
app.use(express.json()); 
app.use(express.static('public')); 
  
// Temporary in-memory data store 
let tasks = [ 
    { id: 1, title: 'Learn HTML/CSS', completed: true }, 
    { id: 2, title: 'Master JavaScript basics', completed: true }, 
    { id: 3, title: 'Understand REST APIs', completed: false } 
]; 
  
// 1. GET ALL TASKS 
app.get('/api/tasks', (req, res) => { 
    res.status(200).json(tasks); 
}); 
  
// 2. GET ONE TASK BY ID 
app.get('/api/tasks/:id', (req, res) => { 
    // TODO: 
    const taskId = Number(req.params.id); 
    if (!Number.isInteger(taskId)) { 
        return res.status(400).json({ message: 'Invalid ID Try Again' }); 
    } 
    const task = tasks.find(item => item.id === taskId); 
    if (!task) { 
        return res.status(404).json({ message: 'Cannot Find Task' }); 
    } 
    return res.status(200).json(task); 
}); 
  
// 3. CREATE A TASK 
app.post('/api/tasks', (req, res) => { 
    // TODO: 
    const title = typeof req.body?.title === 'string' 
        ? req.body.title.trim() 
        : ''; 
    if (!title) { 
        return res.status(400).json({ message: 'A non-empty title is needed' }); 
    } 
    const nextId = tasks.length 
        ? Math.max(...tasks.map(item => item.id)) + 1 
        : 1; 
    const newTask = { id: nextId, title, completed: false }; 
    tasks.push(newTask); 
    return res.status(201).json(newTask); 
}); 
  
// 4. DELETE A TASK 
app.delete('/api/tasks/:id', (req, res) => { 
    // TODO: 
    const taskId = Number(req.params.id); 
    if (!Number.isInteger(taskId)) { 
        return res.status(400).json({ message: 'Invalid ID Try Again' }); 
    } 
    const exists = tasks.some(item => item.id === taskId); 
    if (!exists) { 
        return res.status(404).json({ message: 'Cannot Find Task' }); 
    } 
    tasks = tasks.filter(item => item.id !== taskId); 
    return res.status(200).json({ message: 'Deletion Successful' }); 
}); 
  
app.listen(PORT, () => { 
    console.log(`Server running on http://localhost:${PORT}`); 
}); 