const { Recipe, User, Image } = require("../models");
const { CLOUD_KEY, CLOUD_SECRET } = require("../config");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dfnteocnt",
  api_key: CLOUD_KEY,
  api_secret: CLOUD_SECRET,
});
// console.log(CLOUD_KEY);
// console.log(CLOUD_SECRET);

const upload_image = async (image_url) => {
  console.log(`dalle url to be uploaded`, image_url);
  const response = await cloudinary.uploader
    .upload(image_url)
    .then((result) => {
      console.log("cloud url to return", result.url);
      return result.url;
    });
  return response;
};

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("image").populate("user");
    res.status(200).json(recipes);
    console.log(recipes);
  } catch (error) {
    console.log(error.message);
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
    console.log(`req.body inital`, req.body);
    const image_url = await upload_image(req.body.image);
    console.log(`image_url`, image_url);
    const image = await Image.create({
      image: image_url,
      user: req.body.user,
    });
    const recipe = await (
      await Recipe.create({
        ...req.body,
        image: image._id,
      })
    ).populate("image");

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
