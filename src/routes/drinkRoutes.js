const express = require("express");

const drinkRouter = express.Router();
const {
  getDrinkByName,
  getDrinkByBase,
  getDrinkByNonAlc,
  getDrinkByFruity,
  getDrinkByHeavy,
  getDrinkByFizzy

} = require("../controllers/drinkController");
const { authenticateToken } = require("../middleware/auth");


drinkRouter.get("/drinks/name/:drinkName", getDrinkByName);
drinkRouter.get("/drinks/base/:drinkBase", getDrinkByBase);
drinkRouter.get("/drinks/non-alc", getDrinkByNonAlc);
drinkRouter.get("/drinks/fruity", getDrinkByFruity);
drinkRouter.get("/drinks/fizzy", getDrinkByFizzy);
drinkRouter.get("/drinks/heavy", getDrinkByHeavy);


module.exports = drinkRouter;
