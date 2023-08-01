const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    cookingInstructions: {
      type: Array,
      required: true,
    },
    preparationTime: {
      type: String,
      required: true,
    },
    servings: {
      type: Number,
      required: true,
    },

    ingredients: {
      type: Array,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = recipeSchema;
