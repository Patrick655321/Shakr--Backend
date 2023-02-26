const axios = require("axios");
const ReturnMods = require("../models/returnMods");
const mongoose = require("mongoose")

// const Recipe = require("../models/recipe")

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

async function getDbItem(req, res) {
  let baseSpirit = await ReturnMods.findOne()
  return baseSpirit
}

async function getDrinkByName(req, res) {
  try {
  let apiURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${req.params.drinkName}`;
  let apiResponse = await axios.get(apiURL)
  const products = await ReturnMods.find({})

  const modifiedResponse = apiResponse.data.drinks.map((drink) => {
    for (const keyProd in products[0]) {
      for(const drinkKey in drink) {
        if(keyProd.toLowerCase() == `${drink[drinkKey]}`.toLowerCase()) {
          if(drink[drinkKey].toLowerCase() != products[0][keyProd].toLowerCase()){
            drink[drinkKey] = products[0][keyProd]
          }
        }
      }
    }
    return drink
  })
  
  // if (JSON.stringify(modifiedResponse)) {
  //   const updatedData = JSON.stringify(modifiedResponse);
  //   res.send(JSON.parse(updatedData))
  // } else {
    res.send(modifiedResponse)
  // }
} catch (err) {
  console.error('Error fetching Data:', err);
  res.status(500).send('Error fetching data')

}
}

// get our product from db
// iterate through response checking for matching product keys to response.brandnames
// if find matching brand/key, check if brand name is equiv to product value.
// if true return response
// if false, then update response brand name with product value.

// res.status(200).json(response.data);
// .catch((err) => {
//   console.log(err);
//   res.status(500).json({ message: "internal error" });
// });

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



// async function getDrinkByFruity(req, res) {
//     let watermelon = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Watermelon";
//     // let grapefruit = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Grapefruit_juice";
//     // let pineapple = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Grapefruit_juice";
//     // let strawberries = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Strawberries";
//     // let mango = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Mango";
//     // let cantaloupe = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Cantaloupe";
//     // let berries = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Berries";
//     // let grape = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Grape_juice";
//     // let kiwi = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Kiwi";
//     // let orange = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Orange";
//     // let cranberry = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Cranberry_juice";
//     // let peach = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Peach_nectar";
//     // let midori = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Midori_melon_liqueur";
//     // let cassis = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Creme_de_Cassis";
// try{
//   axios
//     .get(watermelon)
//     .then((response) => {
//         const watermelonDrinks = res.status(200).json(response.data);
//         return watermelonDrinks
//     })
//     } catch(err) {
//       res.status(500).json({ message: "internal error" });
//     };
// //     axios
// //     .get(grapefruit)
// //     .then((response) => {
// //         let grapefruitDrinks = res.json(response.data);
// //         return grapefruitDrinks
// //     })
//     console.log(watermelonDrinks)
//     // let unsortedFruity = watermelonDrinks.push(grapefruitDrinks);
//     // let fruitySorted = [];

//     // for(let drink of unsortedFruity) {
//     //     if(fruitySorted.indexOf(drink) === -1) {
//     //         fruitySorted.push(drink)
//     //     }
//     // console.log(unsortedFruity)
//     }

module.exports = {
  getAllDrinks,
  getDrinkByName,
  getDrinkByBase,
  getDrinkByDanger,
  getDrinkByNonAlc,
  // getDrinkByFruity
};

