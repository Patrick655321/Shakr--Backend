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
  // console.log(array)
  if (array.length < 5) {
    return array;
  }

  let randomIndexes = [];
  let i = 0;
  do {
    let index = randomizer(array);
    if (!randomIndexes.includes(index) && randomIndexes.length <= 4) {
      randomIndexes.push(index);
    }
    i++;
  } while (i < array.length);

  const finalArray = randomIndexes.map((i) => {
    return array[i];
  });
  return finalArray;
}

module.exports = getRandomTen;
