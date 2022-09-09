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
    // Retrieve all of the existing todo list tasks from the database.
    TodoTask.find({}, (err, tasks) => {
      // Once the tasks have loaded, pass them to the template rendering engine,
      // so they can be filled into the template.
      res.render("list.ejs", { todoTasks: tasks });
    });
  })
  // Listen for HTTP POST requests to
  // capture form submissions from <form/> elements on the
  // home page of the To-Do App.
  .post(async (req, res) => {
    // The new task form has been submitted.
    // Based on the form contents,
    // create a new TodoTask object instance.
    const todoTask = new TodoTask({
      // Get the task name from the request body
      // which contains the submitted form contents.
      content: req.body.content,
    });
    // Try saving the new instance to the database,
    // which may throw an error if unsuccessful.
    try {
      // The save function returns a Promise,
      // so we need to wait until it has resolved before proceeding.
      // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
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
  // Listen for HTTP GET requests,
  // which occur when a user clicks the edit button for a task
  // from the list home page. 
  .get((req, res) => {
    // Parse the task ID from the URL path.
    const id = req.params.id;
    // Retrieve all of the existing todo list tasks from the database.
    TodoTask.find({}, (err, tasks) => {
      // Once the tasks have loaded, pass them to the template rendering engine,
      // so they can be filled into the template.
      // Pass the ID of the task that is currently being edited,
      // so that the template engine can render an <input/> element to allow
      // the user to change the text for this task.
      res.render("edit.ejs", { todoTasks: tasks, idTask: id });
    });
  })
  // Listen for HTTP POST requests
  // which occur when a user submits the form rendered by the corresponding
  // /edit/:id GET request (defined above).
  .post((req, res) => {
    // Parse the task ID from the URL path.
    const id = req.params.id;
    // Update the corresponding task's content property,
    // using the TodoTask model's findByIdAndUpdate method,
    // and pass a callback function to execute upon potentially successful
    // completion of the update.
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
      // If an error occurs during the update, return an HTTP 500 status
      // to the user's browser to indicate a server error.
      if(err) {
        return res.send(500, err);
      }
      // If no error has occurred, then we reach this point and
      // we redirect back to the todo list home page,
      // where we re-render the todo list with the updated task contents.
      res.redirect("/");
    });
  });

// Listen for HTTP requests on the remove path
// for a particular task.
app.route("/remove/:id")
  // Listen for HTTP GET requests
  // which occur when a user clicks a delete task button
  // from the list on the todo list home page.
  .get((req, res) => {
    // Parse the task ID from the URL path.
    const id = req.params.id;
    // Use the TodoTask model's findByIdAndRemove method,
    // which takes the ID of the task to remove,
    // and a callback function to execute upon potentially successful
    // removal of the task from the database.
    TodoTask.findByIdAndRemove(id, err => {
      // If an error occurs during the deletion, return an HTTP 500 status
      // to the user's browser to indicate a server error.
      if(err) {
        return res.send(500, err);
      }
      // If no error has occurred, then we reach this point and
      // we redirect back to the todo list home page,
      // where we re-render the todo list without the deleted task.
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
