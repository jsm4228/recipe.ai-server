const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,

      trim: true,
    },
    description: {
      type: String,
    },
    cookingInstructions: {
      type: Array,
    },
    preparationTime: {
      type: String,
    },
    servings: {
      type: String,
    },

    ingredients: {
      type: Array,
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
