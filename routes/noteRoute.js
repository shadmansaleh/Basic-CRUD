const express = require("express");
const logReq = require("../middleware/logReq");
const {
  getAllNotes,
  getNote,
  addNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(logReq);

router.get("/", getAllNotes);
router.get("/:id", getNote);
router.post("/", addNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;
