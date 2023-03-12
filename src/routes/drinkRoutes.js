// Import the necessary dependencies and controllers
const express = require("express");

const drinkRouter = express.Router();
const {
  getDrinkByName,
  getDrinkByBase,
  getDrinkByNonAlc,
  getDrinkByFruity,
  getDrinkByHeavy,
  getDrinkByFizzy,
} = require("../controllers/drinkController");
const { authenticateToken } = require("../middleware/auth");

// Define the routes and their corresponding controller functions
drinkRouter.get("/drinks/name/:drinkName", getDrinkByName);
drinkRouter.get("/drinks/base/:drinkBase", getDrinkByBase);
drinkRouter.get("/drinks/non-alc", getDrinkByNonAlc);
drinkRouter.get("/drinks/fruity", getDrinkByFruity);
drinkRouter.get("/drinks/fizzy", getDrinkByFizzy);
drinkRouter.get("/drinks/heavy", getDrinkByHeavy);

// Export the drinkRouter for use in other files
module.exports = drinkRouter;
