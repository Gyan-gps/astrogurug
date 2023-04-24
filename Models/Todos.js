const todoSchema = require("../Schemas/Todos");
const ObjectId = require("mongodb").ObjectId;
const constants = 5;
const Todos = class {
  taskName;
  taskDiscription;
  userId;
  creationDatetime;

  constructor({taskName, taskDiscription, userId, creationDatetime }) {
    this.taskName = taskName;
    this.taskDiscription = taskDiscription;
    this.creationDatetime = creationDatetime;
    this.userId = userId;
  }

  createTodo() {
    return new Promise(async (resolve, reject) => {
      this.taskName.trim();
      this.taskDiscription.trim();

      const todo = new todoSchema({
        taskName: this.taskName,
        taskDiscription: this.taskDiscription,
        userId: this.userId,
        creationDatetime: this.creationDatetime,
        isCompleted:false
      });

      try {
        const todoDb = await todo.save();
        resolve(todoDb);
      } catch (err) {
        reject(err);
      }
    });
  }

  static getTodos({ offset, email }) {
    return new Promise(async (resolve, reject) => {
      try {
        const todosDb = await todoSchema.aggregate([
          { $sort: { creationDatetime: -1 } }, //DESC -1, ASCD 1
          {
            $facet: {
              data: [
                !email&&{ $skip: parseInt(offset) },
                { $limit: constants },
              ],
            },
          },
        ]);

        resolve(todosDb[0].data);
      } catch (err) {
        reject(err);
      }
    });
  }
  //
  static myTodos({ userId, offset }) {
    return new Promise(async (resolve, reject) => {
      try {
        const todosDb = await todoSchema.aggregate([
          { $match: { userId: new ObjectId(userId) } },
          { $sort: { creationDatetime: -1 } },
          {
            $facet: {
              data: [{ $skip: parseInt(offset) }, { $limit: constants }],
            },
          },
        ]);
        resolve(todosDb[0].data);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }


  static updateTodo({todoId, key, value}) {
    return new Promise(async (resolve, reject) => {
      try {
        const oldDbdata = await todoSchema.findOneAndUpdate(
          {
            _id: new ObjectId(todoId),
          },
          {[key]:value}
        );

        return resolve(oldDbdata);
      } catch (error) {
        return reject(error);
      }
    });
  }

  static deleteTodo({todoId}) {
    return new Promise(async (resolve, reject) => {
      try {
        const todo = await todoSchema.findOneAndDelete({
          _id: new ObjectId(todoId)
        });
        resolve(todo);
      } catch (error) {
        reject(error);
      }
    });
  }
};

module.exports = Todos;
