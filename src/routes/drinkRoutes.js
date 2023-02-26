const express = require("express")

const drinkRouter = express.Router();
const { getAllDrinks, getDrinkByName, getDrinkByBase, getDrinkByDanger, getDrinkByNonAlc, getDrinkByFruity } =  require("../controllers/drinkController")
const { authenticateToken } = require("../middleware/auth")


drinkRouter.get("/drinks", getAllDrinks)

drinkRouter.get("/drinks/name/:drinkName", getDrinkByName)
drinkRouter.get("/drinks/base/:drinkBase", getDrinkByBase)
drinkRouter.get("/drinks/danger", getDrinkByDanger)
drinkRouter.get("/drinks/non-alc", getDrinkByNonAlc)
// drinkRouter.get("/drinks/fruity", getDrinkByFruity)


module.exports = drinkRouter