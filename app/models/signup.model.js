const mongoose = require("mongoose");
// mongodb+srv://userone:userone@projects.rxlpt.mongodb.net/ETaTrA?retryWrites=true&w=majority

const Schema = mongoose.Schema;
const SignupSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    mobilenumber: String,
    dob: String,
    Password: String,
    roleId: Number
});

//! Model creation
var User = mongoose.model("user", SignupSchema);

module.exports = User;