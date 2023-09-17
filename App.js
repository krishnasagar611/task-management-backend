const express = require('express');
const bodyParser = require('body-parser');
const port = 5000; // You can choose any available port
const todoService = require('./service/service.todo') 
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

//For the starting url
app.get('/', (req, res) => {
    res.send('This is a backend server there will no views,So hit the request from the ui or postman.');
  });

//To get all todo hit this url
app.get('/todos', (req, res) => {
    todoService.getAllTodo(req,res);
});

//To get the todo by its id
app.get('/todo', (req, res) => {
    todoService.getTodoByID(req,res);
});

//To create a new TODO
app.post('/todo', (req, res) => {
    todoService.createTodo(req,res);
});


//To update a TODO
app.put('/todo', (req, res) => {
    todoService.updateTodo(req,res);
});


//To delete the TODO
app.delete('/todo', (req, res) => {
    todoService.deleteTodo(req,res);
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
    console.log(`To visit follow the link http://localhost:5000`);
});
