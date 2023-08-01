const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true } // Add the timestamps option here
);

module.exports = imageSchema;
