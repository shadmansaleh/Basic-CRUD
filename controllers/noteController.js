const Note = require("../models/noteModel");

const getAllNotes = async (req, res) => {
  let notes = await Note.find().select("title content author").exec();
  if (notes.length != 0) res.status(200).json(notes);
  else res.status(404).json({ status: "Note not found" });
};

const getNote = async (req, res) => {
  let notes = await Note.find()
    .where({ _id: req.params.id })
    .select("title content author")
    .exec();
  if (notes.length != 0) res.status(200).json(notes);
  else res.status(404).json({ status: "Note not found" });
};

const addNote = async (req, res) => {
  const data = req.body;
  if (data.title && data.content && data.author) {
    let note = new Note({
      title: data.title,
      content: data.content,
      author: data.author,
    });
    note.save();
    res.status(201).json({ status: "Note created successfully" });
  }
};

const updateNote = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  if (data.title || data.content || data.author) {
    let note = await Note.findOne({ _id: id }).exec();
    if (note.length != 0) {
      if (data.title) note.title = data.title;
      if (data.content) note.content = data.content;
      if (data.author) note.author = data.author;
      note.save();
      res.status(200).json({ status: "Note updated successfully" });
    } else {
      res.status(404).json({ status: "Note not found" });
    }
  } else {
    res.status(400).json({ status: "Not enough info" });
  }
};

const deleteNote = async (req, res) => {
  const id = req.params.id;
  let note = await Note.exists({ _id: id }).exec();
  if (note) {
    Note.findOneAndDelete({ _id: id }).exec();
    res.status(200).send("Note deleted successfully");
  } else {
    res.status(404).json({ status: "Note not found" });
  }
};

module.exports = {
  getAllNotes,
  getNote,
  addNote,
  updateNote,
  deleteNote,
};
