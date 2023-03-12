const axios = require("axios");
const ReturnMod = require("../models/ReturnMods");

//function changes generic brand to database brand.
async function modifyResponse(extrapFeed) {
  // Retrieve all products from the ReturnMod collection
  const products = await ReturnMod.find({});
  // Map through each object in extrapFeed array
  const modifiedResponse = extrapFeed.map((drink) => {
    // Loop through each key-value pair in the object
    for (const keyProd in products[0]) {
      for (const drinkKey in drink) {
        // Check if the key matches any of the properties in ReturnMod
        if (keyProd.toLowerCase() == `${drink[drinkKey]}`.toLowerCase()) {
          // If the value in extrapFeed is not equal to the corresponding value in ReturnMod, replace the value in extrapFeed
          if (
            drink[drinkKey].toLowerCase() != products[0][keyProd].toLowerCase()
          ) {
            drink[drinkKey] = products[0][keyProd];
          }
        }
      }
    }
    // Return the modified drink object
    return drink;
  });
  // Return the modified extrapFeed array
  return modifiedResponse;
}

//function uses IDs to find drinks and return required details.
async function extrapDetails(initialArray) {
  // Extract drink IDs
  const drinkIds = initialArray.map((drink) => drink.idDrink);
  
  // Fetch details for each drink ID using Promise.all
  const allDrinks = await Promise.all(
    drinkIds.map((id) =>
      axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      )
    )
  )
    // Extract only the drinks array from each response
    .then((responses) => responses.map((response) => response.data.drinks))
    // Flatten the array of arrays into a single array
    .then((drinkArrays) => drinkArrays.flat());

  // Merge details into new objects
  const results = initialArray.map((drink) => {
    // Find the details object that matches the drink ID
    const details = allDrinks.find((d) => d.idDrink === drink.idDrink);
    const { strDrink, strInstructions, strDrinkThumb } = drink;
    
    // Filter out null and empty ingredient measurements, and only keep relevant keys
    const filteredIngredients = Object.fromEntries(
      Object.entries(details).filter(
        ([key, value]) =>
          (key.includes("strIngredient") && value != null) ||
          (key.includes("strMeasure") && value != null && value != "") ||
          key === "strInstructions" ||
          key === "strDrink" ||
          key === "strDrinkThumb"
      )
    );
    
    // Merge the filtered ingredients with the initial drink object
    return {
      strDrink,
      strInstructions,
      strDrinkThumb,
      ...filteredIngredients,
    };
  });
  
  // Modify the response to match the expected format
  return modifyResponse(results);
}
module.exports = extrapDetails;
