const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const dbConfig = require("./app/config/db.config");

const app = express();

// var corsOptions = {
//   origin: "http://localhost:3000"
// };

//app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
app.use(cors());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));

// app.use(
//   cookieSession({
//     name: "bezkoder-session",
//     secret: "COOKIE_SECRET", // should use as secret environment variable
//     httpOnly: true
//   })
// );

const db = require("./app/models");
const Task = require("./app/models/task.model");
const Project = require("./app/models/project.model");
const Assigntask = require("./app/models/assigntask");
const Role = db.role;
const User = db.user;


db.mongoose
  .connect('mongodb+srv://userone:userone@ictjincy.oaffj.mongodb.net/Library?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true })

  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to bezkoder application."
  });
});
app.get("/users", (req, res) => {
  User.find((err, response) => {
    if (!err && response) {
      res.send(response);
     
    }
  });

});

app.post("/login", (req, res) => {
  console.log(req.body);
  User.findOne({
    username: req.body.username,
    password: req.body.password
  }).exec((err, response) => {
    if (!err && response) {
      console.log(response)
      //res.send(response);
      res.status(200).json({
        response
      });
    } else {
      res.status(404).json({
        response
      });;
      //console.log("err"+response);
    }
  });
});


app.post("/signup", (req, res) => {



  console.log(req.body);

  var users = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    mobilenumber: req.body.mobilenumber,
    dob: req.body.dob,
    password: req.body.password,
    roleId: req.body.roleId,
    username: req.body.email
  }
  var users = new User(users);
  users.save();


});
app.get("/getasstask", (req, res) => { 
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
  Assigntask.find()
    .then(function (user) {
      res.send(user);
    });
});
app.post("/assigntask", (req, res) => {
  console.log(req.body);

  var assigntask = {
    taskid: req.body.taskid,
    userid: req.body.userid,
  
  }
  var assigntask = new Assigntask(assigntask);
  assigntask.save();


});

app.get("/admin", (req, res) => {
  console.log(req.body);
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
  User.find({
    roleId: 2
  })
    .then(function (user) {
      res.send(user);
    });
});
app.get("/user", (req, res) => {
  console.log(req.body);
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
  User.find({
    roleId: 3
  })
    .then(function (user) {
      res.send(user);
    });
});
app.get("/projects", (req, res) => {
  Project.find((err, response) => {
    if (!err && response) {
      res.send(response);     
    }
  });

});
app.get("/tasks", (req, res) => {
  Task.find((err, response) => {
    if (!err && response) {
      res.send(response);     
    }
  });

});
app.get('/:id', (req, res) => {

  const id = req.params.id;
  User.findOne({
    "_id": id
  })
    .then((user) => {
      res.send(user);
    });
});

app.put('/update', (req, res) => {
  console.log(req.body)
  id = req.body._id,
    firstname = req.body.firstname,
    lastname = req.body.lastname,
    email = req.body.email,
    mobilenumber = req.body.mobilenumber,
    dob = req.body.dob,
    roleId = req.body.roleId,
    username = req.body.email
  User.findByIdAndUpdate({
    "_id": id
  }, {
    $set: {
      "firstname": firstname,
      "lastname": lastname,
      "email": email,
      "mobilenumber": mobilenumber,
      "dob": dob,
      "roleId": roleId,
      "username": username,

    }
  })
    .then(function () {
      res.send();
    })
});
app.get('tasksbypid/:id', (req, res) => {

  const id = req.params.id;
  Task.find({
    "projectid": id
  })
    .then((user) => {
      res.send(user);
    });
});
app.delete('/remove/:id', (req, res) => {

  id = req.params.id;
  User.findByIdAndDelete({
    "_id": id
  })
    .then(() => {
      console.log('success')
      res.send();
    })
});


app.get('tasks/:id', (req, res) => {

  const id = req.params.id;
  Task.findOne({
    "_id": id
  })
    .then((user) => {
      res.send(user);
    });
});

app.post("/inserttasks", (req, res) => {
  console.log(req.body);

  var tasks = {
    projectid : req.body.projectid,
    module : req.body.module,
    task : req.body.task,
    allottedby : req.body.allottedby,
    allottedtime : req.body.allottedtime,
    createddate :req.body.createddate,
    status : req.body.status
  }
  var users = new Task(tasks);
  users.save();


});
app.put('/updatetask', (req, res) => {
  console.log(req.body)
  id = req.body._id,
    projectid = req.body.projectid,
    module = req.body.module,
    task = req.body.task,
    allottedby = req.body.allottedby,
    allottedtime = req.body.allottedtime,
    createddate = req.body.createddate,
    status = req.body.status
  Task.findByIdAndUpdate({
    "_id": id
  }, {
    $set: {
      "projectid": projectid,
      "module": module,
      "task": task,
      "allottedby": allottedby,
      "allottedtime": allottedtime,
      "createddate": createddate,
      "status": status,

    }
  })
    .then(function () {
      res.send();
    })
});

app.delete('/removetasks/:id', (req, res) => {

  id = req.params.id;
  console.log(id);
  Task.findByIdAndDelete({
    "_id": id
  })
    .then(() => {
      console.log('success')
      res.send();
    })
});

//projects add,edit,delete
app.get("/getprojects", (req, res) => {
  // console.log(req.body);
  Project.find()
    .then(function (projects) {
      res.send(projects);
    });
});



app.get('/getprojects/:id', (req, res) => {

  const id = req.params.id;
  Project.findOne({
      "_id": id
    })
    .then((user) => {
      res.send(user);
    });
});
app.post("/insertprojects", (req, res) => {
  console.log(req.body);

  var projects = {
    projectname: req.body.projectname,
    clientname: req.body.clientname,
    email: req.body.email,
    country: req.body.country,
    state: req.body.state,
    zipcode: req.body.zipcode,
    phone: req.body.phone,
    startdate: req.body.startdate,
    enddate: req.body.enddate,
    duration: req.body.duration
  }
  var projects = new Project(projects);
  projects.save();


});
app.put('/updateprojects', (req, res) => {
  console.log(req.body)
  id = req.body._id,
    projectname = req.body.projectname,
    clientname = req.body.clientname,
    email = req.body.email,
    country = req.body.country,
    state = req.body.state,
    zipcode = req.body.zipcode,
    phone = req.body.phone,
    startdate = req.body.startdate,
    enddate = req.body.enddate,
    duration = req.body.duration

  Project.findByIdAndUpdate({
      "_id": id
    }, {
      $set: {
        "projectname": projectname,
        "clientname": clientname,
        "email": email,
        "country": country,
        "state": state,
        "zipcode": zipcode,
        "phone": phone,
        "startdate": startdate,
        "enddate": enddate,
        "duration": duration

      }
    })
    .then(function () {
      res.send();
    })
});

app.delete('/removeprojects/:id', (req, res) => {

  id = req.params.id;
  Project.findByIdAndDelete({
      "_id": id
    })
    .then(() => {
      console.log('success')
      res.send();
    })
});

// app.get("/admin", (req, res) => {
//   User.find({ roleId: 2 }).exec((err, response) => {
//     if (!err && response) {
//       console.log(response)
//       //res.send(response);
//       res.status(200).json({ response });
//     }
//     else {
//       console.log("err" + response);
//     }
//   });
// })
app.get("/admins", (req, res) => {
  console.log(req.body);
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
  User.find({
    roleId: 2
  })
    .then(function (admin) {
      res.send(admin);
    });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {

  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
        roleId: 3
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "superadmin",
        roleId: 1
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'superadmin' to roles collection");
      });

      new Role({
        name: "admin",
        roleId: 2
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
  User.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new User({
        username: "superadmin@gmail.com",
        password: "admin123",
        roleId: 1,
        firstname: "user",
        lastname: "one",
        email: "superadmin@gmail.com",
        mobilenumber: "9874561230",
        dob: "01-01-2022"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });


    }
  });
  User.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new User({
        username: "admin@gmail.com",
        password: "admin123",
        roleId: 2,
        firstname: "user",
        lastname: "one",
        email: "admin@gmail.com",
        mobilenumber: "9874561230",
        dob: "01-01-2022"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });


    }
  });
  User.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new User({
        username: "user@gmail.com",
        password: "user1234",
        roleId: 3,
        firstname: "user",
        lastname: "one",
        email: "user@gmail.com",
        mobilenumber: "9874561230",
        dob: "01-01-2022"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });


    }
  });
}