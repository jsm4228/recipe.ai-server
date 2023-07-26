const mongoose = require("mongoose");

const userSchema = require("./user");
const recipeSchema = require("./recipe");
const categorySchema = require("./category");

const User = mongoose.model("User", userSchema);
const Recipe = mongoose.model("Chat", recipeSchema);
const Category = mongoose.model("Message", categorySchema);

module.exports = {
  User,
  Recipe,
  Category,
};
