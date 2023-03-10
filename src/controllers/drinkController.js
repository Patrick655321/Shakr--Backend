const axios = require("axios");

const Randomizer = require("../utils/randomizer");
const extrapDetails = require("../utils/extrapDetails");

const { fruitList, spiritList, fizzList } = require("../utils/arrayInfo")

async function getDrinkByName(req, res) {
  req.params.drinkName = req.params.drinkName.trim().replace(/ /g, '_');//Regex will replace any whitespace in a drink name with an underscore
  const apiURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${req.params.drinkName}`; //dynamic routing allowing for different drink names to use route
  try {
    let apiResponse = await axios.get(apiURL);
    randomTenList = await Randomizer(apiResponse.data.drinks) //See src/utils/randomizer
    const results = await extrapDetails(randomTenList);//See src/utils/extrapDetails
    res.send({drinks: results});//return as json to allow frontend to read
  } catch (err) { //Basic Error handling
    res.status(500).send("Error fetching data, please check spelling and try again");
  }
}

async function getDrinkByBase(req, res) {
  let apiUrl = `http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${req.params.drinkBase}`; //Dynamic route to allow different bases to use route
  try {
    let baseDrinks = []; //Create empty array in which to store response
    const apiResponse = await axios.get(apiUrl) //retrieve data from cocktaildb, store in variable
    baseDrinks.push(...apiResponse.data.drinks); //add drinks to baseDrinks array
    let randomTenList = await Randomizer(baseDrinks); //see src/utils/Randomizer
    const results = await extrapDetails(randomTenList)
    res.status(200).json({drinks: results});
  } catch (err) {
    res.status(500).json({ message: "Error returning drinks, please check connection and try again" });
  }
}

async function getDrinkByNonAlc(req, res) {
  let apiUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
  try {
    let nonAlcDrinks = [];
    const apiResponse = await axios.get(apiUrl);
    nonAlcDrinks.push(...apiResponse.data.drinks);
    let randomTenList = await Randomizer(nonAlcDrinks);
    const results = await extrapDetails(randomTenList)
    res.status(200).json({drinks: results});
  } catch (err) {
    console.log("Error returning drinks");
    res.status(500).json({ message: "Error returning drinks" });
  }
}

async function getDrinkByFruity(req, res) {
  try {
    const allFruity = await Promise.all(
      fruitList.map((fruit) =>
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${fruit}`)
      )
    );
    const fruityDrinks = [];
    allFruity.forEach((response) => {
      const drinks = response.data.drinks || [];
      drinks.forEach((drink) => {
        fruityDrinks.push(drink);
      });
    });
    let randomTenList = await Randomizer(fruityDrinks);
    const results = await extrapDetails(randomTenList)
    res.json({ drinks: results});
  } catch (error) {;
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getDrinkByFizzy(req, res) {
  try {
    const allFizzy = await Promise.all(
      fizzList.map((fizz) =>
      axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${fizz}`)
  )
    );
    const fizzDrinks = [];
    allFizzy.forEach((response) => {
      const drinks = response.data.drinks || [];
      drinks.forEach((drink) => {
        fizzDrinks.push(drink);
      })
    })
    let randomTenList = await Randomizer(fizzDrinks);
    const results = await extrapDetails(randomTenList)
    res.json({ drinks: results });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Error returning drinks" });
  }
}

async function getDrinkByHeavy(req, res) {
  const apiUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail";

  try {
    // Get all cocktail drinks
    const apiResponse = await axios.get(apiUrl);
    const listAllDrinks = apiResponse.data.drinks;

    // Extract drink IDs
    const drinkIds = listAllDrinks.map((drink) => drink.idDrink);
    const allDrinks = await Promise.all(
      drinkIds.map((id) =>
        axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        )
      )
    )
      .then((responses) => responses.map((response) => response.data.drinks))
      .then((drinkArrays) => drinkArrays.flat());
    //

    // Filter drinks that contain any of the specified spirits and do not contain strIngredient4 & include spirit from spirits list
    const heavyList = allDrinks.filter((drink) => {
      return (
        !drink.strIngredient4 &&
        spiritList.some((spirit) => Object.values(drink).includes(spirit))
      );
    });
    // Randomizer functionality to return random 10
    let randomTenList = await Randomizer(heavyList);
    const results = await extrapDetails(randomTenList)
    res.status(200).json({drinks: results});
  } catch (err) {
    res.status(500).json({ message: "sucks to be you" });
  }
}


module.exports = {
  getDrinkByName,
  getDrinkByFizzy,
  getDrinkByBase,
  getDrinkByNonAlc,
  getDrinkByFruity,
  getDrinkByHeavy,
};
