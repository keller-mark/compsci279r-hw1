// Import the mongoose library to use its
// model schema definition utilities.
const mongoose = require("mongoose");

// Define the model and schema for a todo task object.
const todoTaskSchema = new mongoose.Schema({
  // Each todo task has content (i.e., a name),
  // which the user specifies as a string via
  // an HTML <input/> element.
  content: {
    type: String,
    required: true
  },
  // Each todo task has a date,
  // which should default to the current date
  // (i.e., its creation date/time).
  date: {
    type: Date,
    default: Date.now
  }
});

// Export the model from this file,
// so that we can import it into our main ../index.js file,
// were we can use the model to perform CRUD operations on task
// instances from the database.
module.exports = mongoose.model('TodoTask', todoTaskSchema);