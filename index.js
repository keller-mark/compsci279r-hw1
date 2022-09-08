// Import the express web server framework library.
const express = require("express");

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


// Listen for HTTP GET requests on the root path (e.g., http://localhost:3000/)
// and return the To-Do home page HTML template as the response.
app.get('/', (req, res) => {
  res.render("todo.ejs");
});

// Listen for HTTP POST requests on the root path to
// capture form submissions from <form/> elements on the
// home page of the To-Do App.
app.post('/', (req, res) => {
  console.log(req.body);
});


// Start the server and listen for requests on port 3000.
// In addition, pass a callback function that will be executed
// once the server has started successfully.
app.listen(3000, () => console.log("Server up and running."));
