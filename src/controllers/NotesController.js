const NotesModel = require("../models/Notes");
const returnResponse = require("../utils/response/ResponseHandler");

const createNote = async (req, res, next) => {
  const { note } = req.body;
  const { userid, profileId } = req.user;
  if (!note) {
    return returnResponse(
      { code: 400, msg: "Note is required", data: null },
      res
    );
  }
  try {
    const n = new NotesModel({
      userId: userid,
      userProfileId: profileId,
      note,
    });

    const data = await n.save();

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
  const { userid } = req.user;
  try {
    const notes = await NotesModel.find({ userId: userid });
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
  const { userid } = req.user;
  try {
    const data = await NotesModel.findOne({ _id: id, userId: userid });
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
  const { note } = req.body;
  if (!note) {
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
          note,
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
