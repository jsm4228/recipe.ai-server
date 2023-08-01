const mongoose = require("mongoose");

const userSchema = require("./user");
const recipeSchema = require("./recipe");
const imageSchema = require("./image");

const User = mongoose.model("User", userSchema);
const Recipe = mongoose.model("Recipe", recipeSchema);
const Image = mongoose.model("Image", imageSchema);

module.exports = {
  User,
  Recipe,
  Image,
};
