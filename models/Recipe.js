const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  directions: {
    type: String,
    required: true,
  },
});

const Recipe = mongoose.model("recipe", recipeSchema);
module.exports = Recipe;
