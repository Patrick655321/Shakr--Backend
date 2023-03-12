const ReturnMod = require("../models/ReturnMods")

//A function that generates a random index number for an array
function randomizer(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return randomIndex;
}

//A function that filters out drinks that are in the forbidden list and returns only allowed drinks
async function takeForbidden(array) {
  const result = await ReturnMod.find({})
  const forbidden = await result[0].forbidden
  const allowed = array.filter((i) => {
    return !forbidden.includes(i.strDrink)
  })
  return allowed
}

//A function that randomly selects five drinks from an array of allowed drinks
async function getRandomFive(array) {
  const newArray = await takeForbidden(array)
  // If the array of allowed drinks is less than five, return the whole array
  if (newArray.length < 5) {
    return newArray;
  }

  let randomIndexes = [];
  let i = 0;
  do {
    let index = randomizer(newArray);
    if (!randomIndexes.includes(index) && randomIndexes.length <= 4) {
      randomIndexes.push(index);
    }
    i++;
  } while (i < newArray.length);

  const finalArray = randomIndexes.map((i) => {
    return newArray[i];
  });
  return finalArray;
}

module.exports = getRandomFive;
