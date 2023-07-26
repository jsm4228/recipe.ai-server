const { Recipe, User } = require("../models");

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.status(200).json(recipes);
    console.log(recipes);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getRecipesByUser = async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      where: {
        UserId: req.params.id,
      },
    });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllChats,
  getChatsByUser,
  createChat,
  createGPTChat,
  getGPTchat,
};
