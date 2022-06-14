const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const dbConfig = require("./app/config/db.config");

const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// app.use(
//   cookieSession({
//     name: "bezkoder-session",
//     secret: "COOKIE_SECRET", // should use as secret environment variable
//     httpOnly: true
//   })
// );

const db = require("./app/models");

const Role = db.role;
const User = db.user;

db.mongoose
  .connect('mongodb+srv://userone:userone@ictjincy.oaffj.mongodb.net/Library?retryWrites=true&w=majority',{useUnifiedTopology: true})
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
  res.json({ message: "Welcome to bezkoder application." });
});
app.get("/users", (req, res) => {
  User.find((err, response) => {
    if (!err && response) {
      res.send(response);
      res.status(200).send({ response });
    }
  });
  
});

app.post("/login", (req, res) => {
console.log(req.body);
  User.findOne({username:req.body.username,password:req.body.password}).exec((err, response)=>  {
    if (!err && response ) {
      console.log(response)
      //res.send(response);
      res.status(200).json({ response });
    }
    else
    {
      res.status(404).json({ response });;
      //console.log("err"+response);
    }
  });
})

app.get("/admin", (req, res) => {
  console.log(req.body);
    User.find({roleId:2}).exec((err, response)=>  {
      if (!err && response ) {
        console.log(response)
        //res.send(response);
        res.status(200).json({ response });
      }
      else
      {
        console.log("err"+response);
      }
    });
  })

  app.get("/user", (req, res) => {
    console.log(req.body);
      User.find({roleId:3}).exec((err, response)=>  {
        if (!err && response ) {
          console.log(response)
          //res.send(response);
          res.status(200).json({ response });
        }
        else
        {
          console.log("err"+response);
        }
      });
    })

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = 3000;
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
        roleId: 1
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
        roleId: 2
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
        roleId: 3
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });


    }
  });
}
