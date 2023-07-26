const express = require("express");
const Router = express.Router();

const UserRouter = require("./userRouter");
const RecipeRouter = require("./recipeRouter");
const CategoryRouter = require("./categoryRouter");

Router.use("/users", UserRouter);
Router.use("/recipes", RecipeRouter);
Router.use("/category", CategoryRouter);

module.exports = Router;
