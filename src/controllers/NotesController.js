const NotesModel = require("../models/Notes");
const returnResponse = require("../utils/response/ResponseHandler");

const createNote = async (req, res, next) => {
  const { text, title } = req.body;
  const { user_id } = req.user;
  if (!text || !title) {
    return returnResponse(
      { code: 400, msg: "All fields are required", data: null },
      res
    );
  }
  try {
    const noteData = new NotesModel({
      userId: user_id,
      title,
      text,
    });

    const data = await noteData.save();

    if (data) {
      return returnResponse(
        { code: 200, msg: "Note created successfully", data: data },
        res
      );
    }
    return returnResponse(
      { code: 400, msg: "Note creation failed", data: null },
      res
    );
  } catch (error) {
    next(error);
  }
};

const getAllNotes = async (req, res, next) => {
  const { user_id } = req.user;
  try {
    const notes = await NotesModel.find({ userId: user_id });
    if (notes) {
      return returnResponse(
        { code: 200, msg: "Notes fetched successfully", data: notes },
        res
      );
    }
  } catch (error) {
    next(error);
  }
};

const getNote = async (req, res, next) => {
  const { id } = req.params;
  const { user_id } = req.user;
  try {
    const data = await NotesModel.findOne({ _id: id, userId: user_id });
    if (data) {
      return returnResponse(
        { code: 200, msg: "Note fetched successfully", data: data },
        res
      );
    }
    return returnResponse(
      { code: 400, msg: "Note fetch failed", data: null },
      res
    );
  } catch (error) {
    next(error);
  }
};

const updateNote = async (req, res, next) => {
  const { id } = req.params;
  const { text } = req.body;
  if (!text) {
    return returnResponse(
      { code: 400, msg: "Note is required", data: null },
      res
    );
  }
  try {
    const data = await NotesModel.findByIdAndUpdate(
      id,
      {
        $set: {
          text,
        },
      },
      {
        new: true,
      }
    );
    if (data) {
      return returnResponse(
        { code: 200, msg: "Note updated successfully", data: data },
        res
      );
    }
    return returnResponse(
      { code: 400, msg: "Note update failed", data: null },
      res
    );
  } catch (error) {
    next(error);
  }
};
const deleteNote = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await NotesModel.findByIdAndDelete(id);
    if (data) {
      return returnResponse(
        { code: 200, msg: "Note deleted successfully", data: data },
        res
      );
    }
    return returnResponse(
      { code: 400, msg: "Note deletion failed", data: null },
      res
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNote,
  updateNote,
  deleteNote,
  getNote,
  getAllNotes,
};
