const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  metadata: {
    created: {
      type: Date,
      default: () => new Date(),
    },
    task: {
      is_task: Boolean,
      completed: Boolean,
    },
  },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
