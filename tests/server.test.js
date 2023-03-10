const request = require("supertest")
const { app } = require("../src/server")
const mongoose = require("mongoose")
const mongoURI = require("../src/server")
const ReturnMod = require("../src/models/ReturnMods")

const { fruitList, spiritList, fizzList } = require("../src/utils/arrayInfo")

beforeAll(async() => {
  await mongoose.connect("mongodb://127.0.0.1/shkr_db")
});

afterAll(async () => {
  await mongoose.connection.close()
  await new Promise(resolve => setTimeout(() => resolve(), 100))
})

// afterAll(async() => {
//   await mongoose.connection.close()
// });


describe("GET localhost:5000", () => {
    it("shows welcome message", async() => {
        const response = await request(app).get("/")
        expect(response.statusCode).toBe(200)
        expect(response.text).toEqual(expect.stringContaining("Welcome"))
    })
})

describe("GET /drinks/name/:drinkName", () => {
    it("each object in the array contains a key-value pair where strDrink contains 'margarita'", async() => {
        const response = await request(app).get("/drinks/name/margarita")
        const { drinks } = await response.body; 
        expect(response.statusCode).toBe(200)
        expect(Array.isArray(drinks)).toBe(true);
        expect(response.body.drinks.length).toBeLessThanOrEqual(5);
        drinks.forEach(drink => {
            expect(drink.strDrink.toLowerCase()).toContain("margarita");
        });
      });
    })

    describe("GET /drinks/name/:drinkName", () => {
      it("Checking that search params accept whitespace and are NOT case sensitive", async() => {
        const response = await request(app).get("/drinks/name/OLD fasHIOned ")
        const { drinks } = await response.body;
        drinks.forEach(drink => {
          expect(drink.strDrink.toLowerCase()).toContain("old fashioned");
      })
    })
  })

describe("GET /drinks/base/:drinkBase", () => {
    it("Check to see if every object returned contains at least one ingredient that is the equivelant of vodka's brand", async() => {
        const response = await request(app).get("/drinks/base/vodka")
        const { drinks } = await response.body;
        const products = await ReturnMod.find({});
        expect(response.statusCode).toBe(200)
        expect(Array.isArray(drinks)).toBe(true);
        expect(response.body.drinks.length).toBeLessThanOrEqual(5);
        const hasVodka = drinks.some(drink => Object.values(drink).includes(products[0].vodka));
        expect(hasVodka).toBe(true);
    })
})

describe("GET /drinks/fruity", () => {
  it("Ensure every drink in the returned array has an ingredient from the fruitList array", async() => {
    const response = await request(app).get("/drinks/fruity")
    const { drinks } = await response.body;
    const filteredDrinks = drinks.filter((drink) =>
    fruitList.includes(drink.ingredient)
  );
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(drinks)).toBe(true);
    expect(response.body.drinks.length).toBeLessThanOrEqual(5)
    expect(filteredDrinks).toHaveLength(0)
  })
})

describe("GET /drinks/fizzy", () => {
  it("Ensure every drink returned in the array has an ingredient from the fizzList array", async() => {
    it("Ensure every drink in the returned array has an ingredient from the fruitList array", async() => {
      const response = await request(app).get("/drinks/fruity")
      const { drinks } = await response.body;
      const filteredDrinks = drinks.filter((drink) =>
      fizzList.includes(drink.ingredient)
    );
  })
})