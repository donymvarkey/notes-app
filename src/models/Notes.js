const mongoose = require("mongoose");

const Notes = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserProfile",
    required: true,
  },
  note: { type: String, required: true },
  file: { type: String },
});

module.exports = mongoose.model("Notes", Notes);
