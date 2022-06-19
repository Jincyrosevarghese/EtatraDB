const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,

    password: String,
    roleId: Number,

    firstname: String,
    lastname: String,
    email: String,
    mobilenumber: String,
    dob: String

  })
);

module.exports = User;