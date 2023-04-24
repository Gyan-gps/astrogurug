const express = require("express");

const TodosRouter = express.Router();
const Todos = require("../Models/Todos");

TodosRouter.post("/create-todo", async (req, res) => {
  const taskName = req.body.taskName;
  const taskDiscription = req.body.taskDiscription;
  const userId = req.JWT_TOKEN.userId;
  const creationDatetime = Date.now();
  //wrapper data validation inside todoUtil function
  if (!userId) {
    return res.send({
      status: 400,
      message: "Invalid userId",
    });
  }

  if (
    !taskName ||
    !taskDiscription ||
    typeof taskName !== "string" ||
    typeof taskDiscription !== "string"
  ) {
    return res.send({
      status: 400,
      message: "Data Invalid",
    });
  }

  if (taskName.length > 50) {
    return res.send({
      status: 400,
      message: "Task Name is too long. Should be less than 50 character",
    });
  }
  if (taskDiscription.length > 500) {
    return res.send({
      status: 400,
      message:
        "Task Information is too long. Should be less than 500 character",
    });
  }

  //creating a todo obj
  const todo = new Todos({
    taskName,
    taskDiscription,
    userId,
    creationDatetime,
  });
  try {
    const todoDb = await todo.createTodo();
    return res.send({
      status: 201,
      message: "Todo created successfully",
      data: todoDb,
    });
  } catch (err) {
    return res.send({
      status: 400,
      message: "Error occured",
      error: err,
    });
  }
});

TodosRouter.post("/update-todo", async (req, res) => {
  const todoId = req.body.todoId;
  const key = req.body.key;
  const value = req.body.value;
  if (!todoId) {
    return res.send({
      status: 400,
      message: "Please provide todoId",
    });
  }
  try {
    const todo = await Todos.updateTodo({ todoId, key, value });
    return res.send({
      status: 200,
      message: "Update successfully",
      data: todo,
    });
  } catch (err) {
    return res.send({
      status: 400,
      message: "Update Unsuccessfully",
      error: err,
    });
  }
});

TodosRouter.get("/get-todos", async (req, res) => {
  const offset = req.query.offset || 0;

  //call a function to read todos from db
  try {
    const todos = await Todos.getTodos({ offset });

    return res.send({
      status: 200,
      message: "Read successfully",
      data: todos,
    });
  } catch (err) {
    return res.send({
      status: 400,
      message: "Read Unsuccessfully",
      error: err,
    });
  }
});

TodosRouter.get("/my-todos", async (req, res) => {
  const userId = req.JWT_TOKEN.userId;
  const offset = req.query.offset || 0;

  try {
    const todos = await Todos.myTodos({ userId, offset });

    return res.send({
      status: 200,
      message: "Read successfully",
      data: todos,
    });
  } catch (err) {
    return res.send({
      status: 401,
      message: "Read Unsuccessfully",
      error: err,
    });
  }
});

TodosRouter.post("/delete-todo", async (req, res) => {
  const todoId = req.body.todoId;

  if (!todoId) {
    return res.send({
      status: 400,
      message: "Please provide todoId",
    });
  }

  try {
    //delete the todo

    const todoData = await Todos.deleteTodo({ todoId });

    return res.send({
      status: 201,
      message: "Deletion Successfull",
      data: todoData,
    });
  } catch (error) {
    return res.send({
      status: 401,
      message: "Deletion Failed",
      error: error,
    });
  }
});

module.exports = TodosRouter;
