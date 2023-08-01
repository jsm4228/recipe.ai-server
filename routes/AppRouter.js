const express = require("express");
const Router = express.Router();

const UserRouter = require("./userRouter");
const RecipeRouter = require("./recipeRouter");
const ImageRouter = require("./imageRouter");

Router.use("/users", UserRouter);
Router.use("/recipes", RecipeRouter);
Router.use("/image", ImageRouter);

module.exports = Router;
