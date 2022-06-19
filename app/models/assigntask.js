const mongoose = require("mongoose");

const Assigntask = mongoose.model(
    "Assigntask",
    new mongoose.Schema({
        taskid: String,
        userid: String,
        
    })
);

module.exports = Assigntask;