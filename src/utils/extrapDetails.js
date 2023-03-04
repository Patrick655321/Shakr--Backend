function extrapDetails(fullDrinks) {
const results = fullDrinks.map((drink) => {
    const { strDrink, strInstructions, strDrinkThumb, ...ingredients} = drink
  const filteredIngredients = Object.fromEntries(
    Object.entries(ingredients)
    .filter(([key, value]) => (key.includes('strIngredient') && value != null) || (key.includes('strMeasure') && value != null))
    )

    const result = {
      strDrink,
      strInstructions,
      strDrinkThumb,
      ...filteredIngredients
    }
    return result
  })
  return results
}

module.exports = extrapDetails