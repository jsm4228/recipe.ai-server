const express = require("express");
const Router = express.Router();
const controller = require("../controllers/recipeController");

Router.get("/", controller.getAllRecipes);
//Router.get("/:id", controller.getRecipeById);
Router.post("/", controller.createRecipe);
Router.put("/:id", controller.updateRecipe);
Router.delete("/:id", controller.deleteRecipe);
Router.get("/:id", controller.getRecipesByUser);

// Router.get("/userchats/:userId", controller.getChatsByUser);
// Router.post("/", controller.createChat);
// Router.post("/chatgpt", controller.createGPTChat);
// Router.get("/chatgpt/:user", controller.getGPTchat);

module.exports = Router;
