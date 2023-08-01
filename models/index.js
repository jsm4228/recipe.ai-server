const mongoose = require("mongoose");

const userSchema = require("./user");
const recipeSchema = require("./recipe");
const imageSchema = require("./image");

const User = mongoose.model("User", userSchema);
const Image = mongoose.model("Image", imageSchema);
const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = {
  User,
  Recipe,
  Image,
};
