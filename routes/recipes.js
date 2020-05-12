const express = require("express");
const router = express.Router();

const Recipe = require("../models/Recipe");

router.get("/", (req, res) => {
  let recipe_query = Recipe.find({});
  let recipe_promise = recipe_query.exec();

  recipe_promise.then((recipes) => res.json(recipes)).catch((err) => res.send(err));
});

router.post("/add", (req, res) => {
  let new_recipe = new Recipe(req.body);
  let saved_recipe = new_recipe.save();

  saved_recipe
    .then((recipe) => {
      console.log(`${req.body.title} was added to the recipe database!`);
      res.json(recipe);
    })
    .catch((err) => res.send(err));
});

module.exports = router;
