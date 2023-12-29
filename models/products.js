var mongoose = require("mongoose");

var MealSchema = mongoose.Schema({
  Name: String,
  Category: String,
  Price: Number,
  Description: String,
  Ingredients: String,
  Image:  String,
});
var Meals = mongoose.model("Meals", MealSchema);
module.exports = { Meals };
