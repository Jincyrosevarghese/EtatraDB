const mongoose = require("mongoose");

const Task = mongoose.model(
  "Task",
  new mongoose.Schema({
    projectid: String,
    module: String,
    task: String,
    allottedby: String,
    allottedtime: String,
    createddate: String,
    status: String
  })
);

module.exports = Task;
