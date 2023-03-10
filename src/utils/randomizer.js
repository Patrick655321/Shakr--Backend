const ReturnMod = require("../models/ReturnMods")

function randomizer(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return randomIndex;
}

async function takeForbidden(array) {
  const result = await ReturnMod.find({})
  const forbidden = await result[0].forbidden
  const allowed = array.filter((i) => {
    return !forbidden.includes(i.strDrink)
  })
  return allowed
}

async function getRandomTen(array) {
  const newArray = await takeForbidden(array)
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

module.exports = getRandomTen;
