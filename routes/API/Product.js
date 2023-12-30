const express = require("express");
let router = express.Router();
const { Meals } = require("../../models/products");
const auth = require("../../middlewares/auth"); 

router.get("/", async (req, res) => {
  let page =Number(req.query.page ? req.query.page : 1);
  let Perpage = Number(req.query.perpage ? req.query.perpage : 10);
  let skip = (page - 1) * Perpage;
  let Meal = await Meals.find().skip(skip).limit(Perpage);
  let total = await Meals.countDocuments();
  return res.send({total,Meal});
});


router.get("/:id", async (req, res) => {
  try {
    let Meal = await Meals.findById(req.params.id);
    if (!Meal)
      return res.status(400).send("Product With this ID is not present"); 
    return res.send(Meal);
  } catch (err) {
    return res.status(400).send("Id is not correct"); 
  }
});


router.put('/:id',auth, async (req, res) => {
  try {
    let Meal = await Meals.findById(req.params.id);
    if (!Meal) {
      return res.status(400).send('Product with this ID is not present');
    }
    Meal.Name = req.body.Name;
    Meal.Category = req.body.Category;
    Meal.Price = req.body.Price;
    Meal.Description = req.body.Description;
    Meal.Ingredients = req.body.Ingredients;
    Meal.Image = req.body.Image;
    await Meal.save();
    return res.send(Meal);
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).send('Internal Server Error');
  }
});


router.delete("/:id",auth, async (req, res) => {
  let Meal = await Meals.findByIdAndDelete(req.params.id);
  return res.send(Meal);
});


router.post("/",auth, async (req, res) => {
  try {
    let meal = new Meals({
      Name: req.body.Name,
      Category: req.body.Category,
      Price: req.body.Price,
      Description: req.body.Description,
      Ingredients:  req.body.Ingredients,
      Image: req.body.Image,
    });

    await meal.save();
    return res.send(meal);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
});



module.exports = router;
