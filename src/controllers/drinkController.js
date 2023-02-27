const axios = require("axios");
const mongoose = require("mongoose");
const { response } = require("express");
const {removeForbidden} = require("../utils/filterFunctionality")

const Randomizer = require("../utils/randomizer");

async function getAllDrinks(req, res) {
  let apiURL =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail";
  axios
    .get(apiURL)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      res.status(500).json({ message: "internal error" });
    });
}

async function getDrinkByName(req, res) {
  try {
    let apiURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${req.params.drinkName}`;
    let apiResponse = await axios.get(apiURL);
    const products = await FilterList.find({});

    const modifiedResponse = apiResponse.data.drinks.map((drink) => {
      for (const keyProd in products[0]) {
        for (const drinkKey in drink) {
          if (keyProd.toLowerCase() == `${drink[drinkKey]}`.toLowerCase()) {
            if (
              drink[drinkKey].toLowerCase() !=
              products[0][keyProd].toLowerCase()
            ) {
              drink[drinkKey] = products[0][keyProd];
            }
          }
        }
      }
      return drink;
    });
    res.send(modifiedResponse);
  } catch (err) {
    console.error("Error fetching Data:", err);
    res.status(500).send("Error fetching data");
  }
}

async function getDrinkById(req, res) {
  try {
    let apiURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${req.params.Id}`;
    let apiResponse = await axios.get(apiURL);
    const products = await FilterList.find({});
    const modifiedResponse = apiResponse.data.drinks.map((drink) => {
      for (const keyProd in products[0]) {
        for (const drinkKey in drink) {
          if (keyProd.toLowerCase() == `${drink[drinkKey]}`.toLowerCase()) {
            if (
              drink[drinkKey].toLowerCase() !=
              products[0][keyProd].toLowerCase()
            ) {
              drink[drinkKey] = products[0][keyProd];
            }
          }
        }
      }
      return drink;
    });
    res.send(modifiedResponse);
  } catch (err) {
    console.error("Error fetching Data:", err);
    res.status(500).send("Error fetching data");
  }
}

async function getDrinkByBase(req, res) {
  let apiUrl = `http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${req.params.drinkBase}`;
  try {
    let baseDrinks = [];
    const apiResponse = await axios.get(apiUrl);
    baseDrinks.push(...apiResponse.data.drinks);
    let randomTenList = Randomizer(baseDrinks);
    res.status(200).json(randomTenList);
  } catch (err) {
    console.log("Error returning drinks");
    res.status(500).json({ message: "Error returning drinks" });
  }
}

async function getDrinkByDanger(req, res) {
  let apiUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Shot_glass";
  try {
    let dangerDrinks = [];
    const apiResponse = await axios.get(apiUrl);
    dangerDrinks.push(...apiResponse.data.drinks);
    let randomTenList = Randomizer(dangerDrinks);
    res.status(200).json(randomTenList);
  } catch (err) {
    console.log("Error returning drinks");
    res.status(500).json({ message: "Error returning drinks" });
  }
}

async function getDrinkByNonAlc(req, res) {
  let apiUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
  try {
    let dangerDrinks = [];
    const apiResponse = await axios.get(apiUrl);
    dangerDrinks.push(...apiResponse.data.drinks);
    let randomTenList = Randomizer(dangerDrinks);
    res.status(200).json(randomTenList);
  } catch (err) {
    console.log("Error returning drinks");
    res.status(500).json({ message: "Error returning drinks" });
  }
}

async function getDrinkByFruity(req, res) {
  const fruitUrlList = [
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Watermelon",
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Grapefruit_juice",
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Pineapple_juice",
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Strawberries",
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Mango",
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Cantaloupe",
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Berries",
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Grape_juice",
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Kiwi",
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Orange",
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Cranberry_juice",
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Peach_nectar",
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Midori_melon_liqueur",
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Creme_de_Cassis",
  ];
  try {
    let fruityDrinks = [];
    for (const url of fruitUrlList) {
      const apiResponse = await axios.get(url);
      fruityDrinks.push(...apiResponse.data.drinks);
    }
    let randomTenList = Randomizer(fruityDrinks);
    res.status(200).json(randomTenList);
  } catch (err) {
    console.log("Error returning drinks");
    res.status(500).json({ message: "Error returning drinks" });
  }
}

async function getDrinkByFizzy(req, res) {
  const fizzUrlList = [
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Champagne",
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Carbonated_water",
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Lemonade",
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Sprite",
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=7-Up",
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=coca-cola",
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=soda_water",
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=prosecco",
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=ginger_beer",
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Club_soda",
  ];
  try {
    let fizzyDrinks = [];
    for (const url of fizzUrlList) {
      const apiResponse = await axios.get(url);
      fizzyDrinks.push(...apiResponse.data.drinks);
    }
    let randomTenList = Randomizer(fizzyDrinks);
    res.json(randomTenList);
  } catch (err) {
    console.log("Error returning drinks");
    res.status(500).json({ message: "Error returning drinks" });
  }
}

async function getDrinkByHeavy(req, res) {
  let ApiUrl =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail";
  try {
    let listAllDrinks = [];
    let heavyList = [];
    const apiResponse = await axios.get(ApiUrl);
    listAllDrinks.push(...apiResponse.data.drinks);
    for (const drink of listAllDrinks) {
      let idUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`;
      let idUrlResponse = await axios.get(idUrl);
      for (ingredients in idUrlResponse.data.drinks[0]) {
        spiritList = [
          "Vodka",
          "Gin",
          "Cachaca",
          "Aperol",
          "Tequila",
          "Light rum",
          "Dark Rum",
          "Scotch",
          "Bourbon",
          "Brandy",
          "Blended Whiskey",
          "Rum",
          "Cognac",
          "Whiskey",
          "Pisco",
        ];
        for (let j = 0; j < spiritList.length; j++) {
          if (
            idUrlResponse.data.drinks[0].strIngredient4 === null &&
            Object.values(idUrlResponse.data.drinks[0]).includes(
              spiritList[j]
            ) &&
            !heavyList.includes(idUrlResponse.data.drinks[0])
          ) {
            heavyList.push(idUrlResponse.data.drinks[0]);
          }
        }
      }
    }
    let randomTenList = Randomizer(heavyList);
    res.json(randomTenList);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "sucks to be you" });
  }
}

async function getDrinkByMum(req, res) {
  let apiUrl = `http://www.thecocktaildb.com/api/json/v1/1/search.php?f=m`;
  try {
    let mumDrinks = [];
    const apiResponse = await axios.get(apiUrl);
    mumDrinks.push(...apiResponse.data.drinks);
    removeForbidden(mumDrinks)
    res.status(200).json(mumDrinks);
  } catch (err) {
    console.log("Error returning drinks");
    res.status(500).json({ message: "Error returning drinks" });
  }
}

module.exports = {
  getAllDrinks,
  getDrinkByName,
  getDrinkByFizzy,
  getDrinkByBase,
  getDrinkByDanger,
  getDrinkByNonAlc,
  getDrinkByFruity,
  getDrinkByHeavy,
  getDrinkById,
  getDrinkByMum
};
