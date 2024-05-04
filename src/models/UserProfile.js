const mongoose = require("mongoose");

const UserProfile = new mongoose.Schema({
  name: { type: String, required: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("UserProfile", UserProfile);
