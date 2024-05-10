const express = require("express");
const router = express.Router();
const NotesController = require("../controllers/NotesController");
const middlewares = require("../middlewares");

router.post("/", middlewares.isAuthorised, NotesController.createNote);
router.get("/", middlewares.isAuthorised, NotesController.getAllNotes);
router.get("/:id", middlewares.isAuthorised, NotesController.getNote);
router.put("/", middlewares.isAuthorised, NotesController.updateNote);
router.delete("/", middlewares.isAuthorised, NotesController.deleteNote);

module.exports = router;
