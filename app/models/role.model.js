const mongoose = require("mongoose");

const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: String,
    roleId: Number
  })
);

module.exports = Role;
