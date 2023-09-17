const fs = require("fs");

const findIndex = (arr, id) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) return i;
    }
    return -1;
}

const removeAtIndex = (arr, index) => {
    let newArray = [];
    for (let i = 0; i < arr.length; i++) {
      if (i !== index) newArray.push(arr[i]);
    }
    return newArray;
}

const getAllTodo = (req,res) => {
    fs.readFile("todos.json", "utf8", (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
}

const getTodoByID = (req,res) => {
    fs.readFile("todos.json", "utf8", (err, data) => {
        if (err) throw err;
        const todos = JSON.parse(data);
        const todoIndex = findIndex(todos, parseInt(req.body.id));
        if (todoIndex === -1) {
          res.send("The ID is not present in Data.");
        } else {
          res.json(todos[todoIndex]);
        }
    });
}

const createTodo = (req,res) => {
    const newTodo = {
        id: Math.floor(Math.random() * 10000), // unique random id
        name: req.body.name,
        Description: req.body.Description,
        isCompleted: false // Initially this will be false
      };
      fs.readFile("todos.json", "utf8", (err, data) => {
        if (err) throw err;
        const todos = JSON.parse(data);
        todos.push(newTodo);
        fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
          if (err) throw err;
          res.status(201).json(newTodo);
        });
    });
}

const updateTodo = (req,res) => {
    fs.readFile("todos.json", "utf8", (err, data) => {
        if (err) throw err;
        const todos = JSON.parse(data);
        const todoIndex = findIndex(todos, parseInt(req.body.id));
        if (todoIndex === -1) {
          res.send("The ID is not present in the data.");
        } else {
          const updatedTodo = {
            id: todos[todoIndex].id,
            name: req.body.name,
            Description: req.body.Description,
            isCompleted: req.body.isCompleted
          };
          todos[todoIndex] = updatedTodo;
          fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
            if (err) throw err;
            res.status(200).json(updatedTodo);
          });
        }
    });
}

const deleteTodo = (req,res) => {
    fs.readFile("todos.json", "utf8", (err, data) => {
        if (err) throw err;
        let todos = JSON.parse(data);
        const todoIndex = findIndex(todos, parseInt(req.body.id));
        if (todoIndex === -1) {
          res.send("The ID is not present in the data.");
        } else {
          todos = removeAtIndex(todos, todoIndex);
          fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
            if (err) throw err;
            res.send("Todo deleted successfully.");
          });
        }
    });
}

module.exports = {getAllTodo, getTodoByID, createTodo, updateTodo, deleteTodo}
