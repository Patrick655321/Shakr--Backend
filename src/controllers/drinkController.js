const axios = require("axios");
const ReturnMods = require("../models/returnMods");
const mongoose = require("mongoose");
const { response } = require("express");

const Randomizer = require("../utils/randomizer")

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
    const products = await ReturnMods.find({});

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
    const products = await ReturnMods.find({});
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
  let apiURL = `http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${req.params.drinkBase}`;
  axios
    .get(apiURL)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "internal error" });
    });
}

async function getDrinkByDanger(req, res) {
  let apiURL =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Shot_glass";
  axios
    .get(apiURL)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "internal error" });
    });
}

async function getDrinkByNonAlc(req, res) {
  let apiURL =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
  axios
    .get(apiURL)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "internal error" });
    });
}



async function getDrinkByFruity(req, res) {
  const fruitUrlList = ["https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Watermelon",
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
                "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Creme_de_Cassis"
  ]
  try {
  let fruityDrinks = [];
  for(const url of fruitUrlList) {
    const apiResponse = await axios.get(url);
    fruityDrinks.push(...apiResponse.data.drinks);
    }
  let randomTenList = Randomizer(fruityDrinks)
  res.json(randomTenList)
  } catch (err) {
    console.log("Error returning drinks")
    res.status(500).json({message: "Error returning drinks"})
  }
}  


module.exports = {
  getAllDrinks,
  getDrinkByName,
  getDrinkByBase,
  getDrinkByDanger,
  getDrinkByNonAlc,
  getDrinkByFruity,
  getDrinkById
};
