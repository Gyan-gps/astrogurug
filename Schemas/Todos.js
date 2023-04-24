const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  taskName:{
    type:String,
    required:true
  },
  taskDiscription: {
    type: String,
    required: true,
  },
  creationDatetime: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  isCompleted:{
    type:Boolean,
    required:true
  }
});

module.exports = mongoose.model("Todos", todoSchema);
