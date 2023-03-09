const axios = require("axios")
const ReturnMod = require("../models/ReturnMods")


async function modifyResponse(extrapFeed) {
  const products = await ReturnMod.find({});
  const modifiedResponse = extrapFeed.map((drink) => {
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
    return modifiedResponse;
  }

async function extrapDetails(initialArray) {
  // Extract drink IDs
  const drinkIds = initialArray.map((drink) => drink.idDrink);
  // Fetch details for each drink ID
  const allDrinks = await Promise.all(
    drinkIds.map((id) =>
      axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      )
    )
  ).then((responses) => responses.map((response) => response.data.drinks)).then((drinkArrays) => drinkArrays.flat());

  // Merge details into new objects
  const results = initialArray.map((drink) => {
    const details = allDrinks.find((d) => d.idDrink === drink.idDrink);
    const { strDrink, strInstructions, strDrinkThumb } = drink;
    const filteredIngredients = Object.fromEntries(
      Object.entries(details)
        .filter(
          ([key, value]) =>
            (key.includes('strIngredient') && value != null) || (key.includes('strMeasure') && value != null && value != "" || key === "strInstructions" || key === "strDrink" || key === strDrinkThumb)
        )
    );
    return {
      strDrink,
      strInstructions,
      strDrinkThumb,
      ...filteredIngredients,
    };
  });
  return modifyResponse(results);
}

module.exports = extrapDetails