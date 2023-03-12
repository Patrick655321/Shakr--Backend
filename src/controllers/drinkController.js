// Importing required dependencies and functions from files
const axios = require("axios");
const Randomizer = require("../utils/randomizer");
const extrapDetails = require("../utils/extrapDetails");

// Importing arrays from arrayInfo file
const { fruitList, spiritList, fizzList } = require("../utils/arrayInfo")

// Async function to retrieve drink by name
async function getDrinkByName(req, res) {
  // Modifying parameter by replacing any whitespace in drink name with an underscore
  req.params.drinkName = req.params.drinkName.trim().replace(/ /g, '_');
   // API URL with parameterized drink name for dynamic routing
  const apiURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${req.params.drinkName}`; 
  try {
    // Make request to API using axios
    let apiResponse = await axios.get(apiURL);
    // Retrieve a list of five random drinks from the API response using Randomizer function
    randomFiveList = await Randomizer(apiResponse.data.drinks) 
    // Add extra details to the list of five drinks using extrapDetails function
    const results = await extrapDetails(randomFiveList);
    // Return the result as a JSON object to be read by the frontend
    res.send({drinks: results});
    
  } catch (err) { 
    // If an error occurs, send a 500 error status with a relevant error message
    res.status(500).send("Error fetching data, please check spelling and try again");
  }
}
// Async function to retrieve drink by base
async function getDrinkByBase(req, res) {
  // API URL with parameterized drink base for dynamic routing
  let apiUrl = `http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${req.params.drinkBase}`; 
  try {
    let baseDrinks = []; 
      // Make request to API using axios
    const apiResponse = await axios.get(apiUrl) 
    baseDrinks.push(...apiResponse.data.drinks); 
    // Retrieve a list of five random drinks from the API response using Randomizer function
    let randomFiveList = await Randomizer(baseDrinks); 
    // Add extra details to the list of five drinks using extrapDetails function
    const results = await extrapDetails(randomFiveList)
    // Return the result as a JSON object to be read by the frontend
    res.status(200).json({drinks: results}); 
  } catch (err) {
    // If an error occurs, send a 500 error status with a relevant error message
    res.status(500).json({ message: "Error returning drinks, please check connection and try again" });
  }
}
// All of the functions have essentially the same functionality so for the purposes of readability I
// only going to comment on where the search functions differ from this point on:

async function getDrinkByNonAlc(req, res) {
  let apiUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
  try {
    let nonAlcDrinks = [];
    const apiResponse = await axios.get(apiUrl); 
    nonAlcDrinks.push(...apiResponse.data.drinks); 
    let randomFiveList = await Randomizer(nonAlcDrinks);
    const results = await extrapDetails(randomFiveList)
    res.status(200).json({drinks: results});
  } catch (err) {
    console.log("Error returning drinks");
    res.status(500).json({ message: "Error returning drinks" });
  }
}

async function getDrinkByFruity(req, res) {
  try {
    // Using Promise.all to make multiple API requests for each fruit in the fruitList array.
    const allFruity = await Promise.all(
      fruitList.map((fruit) =>
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${fruit}`)
      )
    );
    const fruityDrinks = [];
    allFruity.forEach((response) => { // Looping through each API response to extract the drinks.
      const drinks = response.data.drinks || [];// Using default value of empty array in case there is no response.
      drinks.forEach((drink) => {// Looping through each drink and adding it to the fruityDrinks 
        fruityDrinks.push(drink);
      });
    });
    let randomFiveList = await Randomizer(fruityDrinks);
    const results = await extrapDetails(randomFiveList)
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
    let randomFiveList = await Randomizer(fizzDrinks);
    const results = await extrapDetails(randomFiveList)
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
    let randomFiveList = await Randomizer(heavyList);
    const results = await extrapDetails(randomFiveList)
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
