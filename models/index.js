const mongoose = require("mongoose");

const userSchema = require("./user");
const recipeSchema = require("./recipe");
const categorySchema = require("./category");

const User = mongoose.model("User", userSchema);
const Recipe = mongoose.model("Recipe", recipeSchema);
const Category = mongoose.model("Category", categorySchema);

module.exports = {
  User,
  Recipe,
  Category,
};
