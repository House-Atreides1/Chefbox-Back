const express = require("express");
const router = express.Router();

const Recipe = require("../models/Recipe");

router.get("/", (req, res) => {
  let recipe_query = Recipe.find({});
  let recipe_promise = recipe_query.exec();

  recipe_promise
    .then((recipes) => {
      recipes.length < 1
        ? res.send("No recipes in the database.")
        : res.send(recipes);
    })
    .catch((err) => res.send(err));
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

router.put("/editrecipe/:id", (req, res) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      recipe.title = req.body.title;
      recipe.description = req.body.description;
      recipe.directions = req.body.directions;

      recipe
        .save()
        .then(() =>
          res.json(`Recipe for ${recipe.title} updated successfully.`)
        )
        .catch((err) => res.json(`Error: ${err}`));
    })
    .catch((err) => res.json(`Error: ${err}`));
});

router.delete("/delete/:id", (req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then((recipe) => {
      res.json(`${recipe.title} has been delted successfully.`);
    })
    .catch((err) => `Error: ${err}`);
});

module.exports = router;
