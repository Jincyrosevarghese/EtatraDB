const mongoose = require("mongoose");

const Project = mongoose.model(
    "Project",
    new mongoose.Schema({
        projectname: String,
        clientname: String,
        email: String,
        country: String,
        state: String,
        Zipcode: String,
        startdate: String,
        phone: String,
        enddate: String,
        duration: String
    })
);

module.exports = Project;