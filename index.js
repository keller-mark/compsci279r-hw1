// Import the express web server framework library.
const express = require("express");
// Import the dotenv library to be able to use
// environment variables stored in the local file ./.env
const dotenv = require("dotenv");
// Import the mongoose library to be able to connect
// and read/write to the MongoDB database.
const mongoose = require("mongoose");

// Import the database models.
const TodoTask = require("./models/TodoTask");

// Load the environment variables from ./.env
dotenv.config();

// Create a new web server instance by calling
// the express top-level function.
const app = express();

// Configure the web server properties.
// Set the view engine to the ejs templating
// library which we previously installed into our NodeJS
// environment from NPM.
app.set("view engine", "ejs");
// Configure the contents of the local directory ./public
// to be served as static files from the /static URL
// base path (e.g., to serve the local file ./public/stylesheets/style.css at
// http://localhost:3000/static/stylesheets/style.css)
app.use("/static", express.static("public"));
// Configure the form encoding to be able to POST form
// information in the request body.
app.use(express.urlencoded({ extended: true }));

// Listen for HTTP requests on the root path (e.g., http://localhost:3000/)
app.route("/")
  // Listen for HTTP GET requests
  // and return the To-Do home page HTML template as the response.
  .get((req, res) => {
    TodoTask.find({}, (err, tasks) => {
      res.render("list.ejs", { todoTasks: tasks });
    });
  })
  // Listen for HTTP POST requests to
  // capture form submissions from <form/> elements on the
  // home page of the To-Do App.
  .post(async (req, res) => {
    console.log(req.body);
    // The new task form has been submitted.
    // Based on the form contents,
    // create a new TodoTask object instance.
    const todoTask = new TodoTask({
      content: req.body.content,
    });
    // Try saving the new instance to the database.
    try {
      await todoTask.save();
      // The save was successful, so redirect back to the
      // todo list home page.
      res.redirect("/");
    } catch(err) {
      // The save was not successful, but also redirect back to the
      // todo list home page.
      res.redirect("/");
    }
  });

// Listen for HTTP requests on the edit path
// for a particular task.
app.route("/edit/:id")
  .get((req, res) => {
    // Parse the ID from the URL path.
    const id = req.params.id;
    TodoTask.find({}, (err, tasks) => {
      res.render("edit.ejs", { todoTasks: tasks, idTask: id });
    });
  })
  .post((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
      if(err) {
        return res.send(500, err);
      }
      res.redirect("/");
    });
  });

// Listen for HTTP requests on the remove path
// for a particular task.
app.route("/remove/:id")
  .get((req, res) => {
    // Parse the ID from the URL path.
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
      if(err) {
        return res.send(500, err);
      }
      res.redirect("/");
    });
  });

// Connect to the database.
// Provide a callback function, so that, upon successful connection,
// we can start the web server with the database connection pre-established.
// Reference: https://stackoverflow.com/a/69035706
mongoose.connect(process.env.DB_CONNECT).then(() => {
  console.log("Connected to database.");
  // Now that the database connection has been established,
  // start the server and listen for requests on port 3000,
  // or the dynamic port as specified by the Heroku server.
  // In addition, pass a callback function that will be executed
  // once the server has started successfully.
  app.listen(process.env.PORT, () => console.log("Server up and running."));
});

