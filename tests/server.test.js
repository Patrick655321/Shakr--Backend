const request = require("supertest")
const { app } = require("../src/server")
const mongoose = require("mongoose")
const ReturnMod = require("../src/models/ReturnMods")

const { fruitList, spiritList, fizzList } = require("../src/utils/arrayInfo")
const { post } = require("../src/routes/userRoutes")

const cleanString = (str) => str.toLowerCase().replace(/_/g, ' ').replace(/[^a-z0-9]+/g, '').trim();

beforeAll(async() => {
  await mongoose.connect("mongodb://127.0.0.1/shkr_db")
});

afterAll(async () => {
  await mongoose.connection.close()
  await new Promise(resolve => setTimeout(() => resolve(), 100))
})

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
    const formattedFruitList = fruitList.map((value) => cleanString(value.replace('_', ' ')));
    const filteredDrinks = drinks.filter((drink) =>
  Object.values(drink).map((value) => cleanString(value)).some(
    (value) => formattedFruitList.includes(value)
  )
);
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(drinks)).toBe(true);
    expect(response.body.drinks.length).toBeLessThanOrEqual(5)
    expect(filteredDrinks).toHaveLength(5)
  })
})

describe("GET /drinks/fizzy", () => {
    it("Ensure every drink in the returned array has an ingredient from the fruitList array", async() => {
      const response = await request(app).get("/drinks/fizzy")
      const { drinks } = await response.body;
      const formattedFizzList = fizzList.map((value) => cleanString(value.replace('_', ' ')));
      const filteredDrinks = drinks.filter((drink) =>
        Object.values(drink).map((value) => cleanString(value)).some(
          (value) => formattedFizzList.includes(value)
        )
      );
      expect(response.statusCode).toBe(200)
      expect(Array.isArray(drinks)).toBe(true);
      expect(response.body.drinks.length).toBeLessThanOrEqual(5)
      expect(filteredDrinks).toHaveLength(5)
  })
})

describe("GET /drinks/non-alc", () => {
  it("Ensure every drink in the returned array has an ingredient from the fruitList array", async() => {
    const response = await request(app).get("/drinks/non-alc")
    const { drinks } = await response.body;
    const formattedSpiritList = spiritList.map((value) => cleanString(value.replace('_', ' ')));
    const filteredDrinks = drinks.filter((drink) =>
      Object.values(drink).map((value) => cleanString(value)).some(
        (value) => formattedSpiritList.includes(value)
      )
    );
  expect(response.statusCode).toBe(200)
  expect(Array.isArray(drinks)).toBe(true);
  expect(response.body.drinks.length).toBeLessThanOrEqual(5)
  expect(filteredDrinks).toHaveLength(0)
})
})

describe("GET /drinks/heavy", () => {
  it("Ensure every drink in the returned array has an ingredient from the spiritList array and that no drink contains more than 3 ingredients", async() => {
    const response = await request(app).get("/drinks/heavy")
    const { drinks } = await response.body;
    const formattedSpiritList = spiritList.map((value) => cleanString(value.replace('_', ' ')));
    const filteredDrinks = drinks.filter((drink) =>
      Object.values(drink).map((value) => cleanString(value)).some(
        (value) => formattedSpiritList.includes(value)
      )
    );
    const ingredient4Check = drinks.filter((drink) =>
  drink.hasOwnProperty('strIngredient4')
);
  expect(response.statusCode).toBe(200)
  expect(Array.isArray(drinks)).toBe(true);
  expect(response.body.drinks.length).toBeLessThanOrEqual(5)
  expect(filteredDrinks.length).toBeGreaterThan(0)
  expect(ingredient4Check).toHaveLength(0)
})
})

describe("PUT /products/swap", () => {
  it("swaps brands out", async() => {
    const response = await request(app).put("/products/brand/swap")
    .send({
      spiritName: "test_spirit",
      newBrand: "Old Mate Patty's Mountain Moonshine!"
    })
    expect(response.statusCode).toBe(200)
    expect(response.body.test_spirit).toEqual("Old Mate Patty's Mountain Moonshine!")
  })
})

describe("POST /products/forbidden/add", () => {
  it("add item to forbidden array", async() => {
    const response = await request(app)
    .post("/products/forbidden/add")
    .send({
      drink: "Rocket fuel"
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.forbidden[response.body.forbidden.length - 1]).toEqual("Rocket fuel")
    const failResponse = await request(app)
      .post("/products/forbidden/add")
      .send({ drink: "Rocket fuel"});
    expect(failResponse.status).toBe(400)
  })
})

describe("PATCH /products/forbidden/remove", () => {
  it("remove item from forbidden array", async() => {
    const response = await request(app).patch("/products/forbidden/remove")
    .send({
      drink: "Martini"
    })
    expect(response.statusCode).toBe(200);
    expect(response.body.forbidden.includes("Martini")).toBe(false)
  })})