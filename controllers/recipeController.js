const { Recipe, User, Image } = require("../models");

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
    const image = await Image.create({
      image: req.body.image,
      user: req.body.user,
    });
    const recipe = await Recipe.create({
      ...req.body,
      image: image._id,
    })
      .populate("User")
      .populate("Image");

    res.status(200).json(recipe);
  } catch (error) {
    console.log(error.message);
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
    }).populate("User");
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipesByUser,
};
