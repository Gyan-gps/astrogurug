const express = require("express");
const isAuth = require('./Middlewares/isAuth')

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// import
const db = require("./db");
const AuthRouter = require("./Controllers/Auth");
const TodosRouter = require("./Controllers/Todos");
const taskReminder = require('./TaskReminder');

app.get("/", (req, res) => {
  res.send({
    status: 200,
    message: "Welcome to my API",
  });
});

app.use("/auth", AuthRouter);

app.use("/todos",isAuth,TodosRouter);

app.listen(8000, () => {
  console.log("App Start at port 8000");
  taskReminder();
});
