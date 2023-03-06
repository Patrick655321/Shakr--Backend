const ReturnMod = require("../models/ReturnMods");



async function modifyResponse(apiResponse) {
    const products = await ReturnMod.find({});
    // console.log(apiResponse)
    const modifiedResponse = apiResponse.map((drink) => {
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
      console.log(modifiedResponse)
      return modifiedResponse;
    }

module.exports = modifyResponse