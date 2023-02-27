function randomizer(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return randomIndex;
}

function getRandomTen(array) {
  if (array.length < 10) {
    return array;
  }

  let randomIndexes = [];
  let i = 0;
  do {
    let index = randomizer(array);
    if (!randomIndexes.includes(index) && randomIndexes.length <= 9) {
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
