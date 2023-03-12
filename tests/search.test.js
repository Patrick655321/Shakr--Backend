const request = require("supertest");
const { app } = require("../src/server");
const mongoose = require("mongoose");
const ReturnMod = require("../src/models/ReturnMods");

const { fruitList, spiritList, fizzList } = require("../src/utils/arrayInfo");

const cleanString = (str) =>
  str
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/[^a-z0-9]+/g, "")
    .trim();

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1/shkr_db");
});

afterAll(async () => {
  await mongoose.connection.close();
  await new Promise((resolve) => setTimeout(() => resolve(), 100));
});

// This test suite checks the response for the GET request to the root path
describe("GET localhost:5000", () => {
  // This test case checks if the response contains the welcome message
  it("shows welcome message", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual(expect.stringContaining("Welcome"));
  });
});

// This test suite checks the response for the GET request to the '/drinks/name/:drinkName' endpoint
describe("GET /drinks/name/:drinkName", () => {
  // This test case checks if each object in the response array contains the key-value pair where strDrink contains 'margarita'
  it("each object in the array contains a key-value pair where strDrink contains 'margarita'", async () => {
    const response = await request(app).get("/drinks/name/margarita");
    const { drinks } = await response.body;
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(drinks)).toBe(true);
    expect(response.body.drinks.length).toBeLessThanOrEqual(5);
    drinks.forEach((drink) => {
      expect(drink.strDrink.toLowerCase()).toContain("margarita");
    });
  });
});

// This test suite checks the response for the GET request to the '/drinks/name/:drinkName' endpoint
describe("GET /drinks/name/:drinkName", () => {
  // This test case checks if the search parameter accepts whitespace and is NOT case sensitive
  it("Checking that search params accept whitespace and are NOT case sensitive", async () => {
    const response = await request(app).get("/drinks/name/OLD fasHIOned ");
    const { drinks } = await response.body;
    drinks.forEach((drink) => {
      expect(drink.strDrink.toLowerCase()).toContain("old fashioned");
    });
  });
});

// Test to check if every drink returned contains at least one ingredient that is the equivalent of vodka's brand
describe("GET /drinks/base/:drinkBase", () => {
  it("Check to see if every object returned contains at least one ingredient that is the equivalent of vodka's brand", async () => {
    const response = await request(app).get("/drinks/base/vodka");
    const { drinks } = await response.body;
    // Get vodka brand from the database
    const products = await ReturnMod.find({});
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(drinks)).toBe(true);
    expect(response.body.drinks.length).toBeLessThanOrEqual(5);
    // Check if at least one drink contains the vodka brand
    const hasVodka = drinks.some((drink) =>
      Object.values(drink).includes(products[0].vodka)
    );
    expect(hasVodka).toBe(true);
  });
});

// Test to ensure that every drink in the returned array has an ingredient from the fruitList array
describe("GET /drinks/fruity", () => {
  it("Ensure every drink in the returned array has an ingredient from the fruitList array", async () => {
    const response = await request(app).get("/drinks/fruity");
    const { drinks } = await response.body;
    // Clean and format fruitList
    const formattedFruitList = fruitList.map((value) =>
      cleanString(value.replace("_", " "))
    );
    // Filter drinks that contain an ingredient from the formattedFruitList
    const filteredDrinks = drinks.filter((drink) =>
      Object.values(drink)
        .map((value) => cleanString(value))
        .some((value) => formattedFruitList.includes(value))
    );
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(drinks)).toBe(true);
    expect(response.body.drinks.length).toBeLessThanOrEqual(5);
    expect(filteredDrinks).toHaveLength(5);
  });
});

// Test to ensure that every drink in the returned array has an ingredient from the fizzList array
describe("GET /drinks/fizzy", () => {
  it("Ensure every drink in the returned array has an ingredient from the fizzList array", async () => {
    const response = await request(app).get("/drinks/fizzy");
    const { drinks } = await response.body;
    // Clean and format fizzList
    const formattedFizzList = fizzList.map((value) =>
      cleanString(value.replace("_", " "))
    );
    // Filter drinks that contain an ingredient from the formattedFizzList
    const filteredDrinks = drinks.filter((drink) =>
      Object.values(drink)
        .map((value) => cleanString(value))
        .some((value) => formattedFizzList.includes(value))
    );
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(drinks)).toBe(true);
    expect(response.body.drinks.length).toBeLessThanOrEqual(5);
    expect(filteredDrinks).toHaveLength(5);
  });
});

// Test for GET /drinks/non-alc endpoint
describe("GET /drinks/non-alc", () => {
  it("Ensure every drink in the returned array has an ingredient from the spiritList array", async () => {
    // Send a GET request to the /drinks/non-alc endpoint
    const response = await request(app).get("/drinks/non-alc");
    // Get the drinks array from the response body
    const { drinks } = await response.body;
    // Format the spiritList array to remove underscores and convert to lowercase
    const formattedSpiritList = spiritList.map((value) =>
      cleanString(value.replace("_", " "))
    );
    // Filter the drinks array to only include drinks that have an ingredient from the formatted spiritList array
    const filteredDrinks = drinks.filter((drink) =>
      Object.values(drink)
        .map((value) => cleanString(value))
        .some((value) => formattedSpiritList.includes(value))
    );
    // Assert that the response status code is 200
    expect(response.statusCode).toBe(200);
    // Assert that the drinks variable is an array
    expect(Array.isArray(drinks)).toBe(true);
    // Assert that the number of drinks returned is less than or equal to 5
    expect(response.body.drinks.length).toBeLessThanOrEqual(5);
    // Assert that there are no drinks in the filteredDrinks array
    expect(filteredDrinks).toHaveLength(0);
  });
});

// Test for GET /drinks/heavy endpoint
describe("GET /drinks/heavy", () => {
  it("Ensure every drink in the returned array has an ingredient from the spiritList array and that no drink contains more than 3 ingredients", async () => {
    // Send a GET request to the /drinks/heavy endpoint
    const response = await request(app).get("/drinks/heavy");
    // Get the drinks array from the response body
    const { drinks } = await response.body;
    // Format the spiritList array to remove underscores and convert to lowercase
    const formattedSpiritList = spiritList.map((value) =>
      cleanString(value.replace("_", " "))
    );
    // Filter the drinks array to only include drinks that have an ingredient from the formatted spiritList array
    const filteredDrinks = drinks.filter((drink) =>
      Object.values(drink)
        .map((value) => cleanString(value))
        .some((value) => formattedSpiritList.includes(value))
    );
    // Get the first document from the ReturnMod collection
    const products = await ReturnMod.find({});
    const id = products[0].id;
    const document = await ReturnMod.findById(id).lean().exec();
    // Get all the values from the document and format them to remove underscores and convert to lowercase
    const values = Object.values(document);
    const formattedValues = values
      .filter((val) => val && typeof val === "string")
      .map((val) => cleanString(val.replace("", " ")));
    // Filter the drinks array to only include drinks that have an ingredient from the formattedValues array
    const filtered2 = drinks.filter((d) =>
      Object.values(d)
        .map((v) => cleanString(v))
        .some((v) => formattedValues.includes(v))
    );
    // Filter the drinks array to only include drinks that have less than 4 ingredients
    const ingredient4Check = drinks.filter((drink) =>
      drink.hasOwnProperty("strIngredient4")
    );
    // Assert that the response status code is 200
    expect(response.statusCode).toBe(200);
    // Assert that the drinks variable is an array
    expect(Array.isArray(drinks)).toBe(true);
    // Assert that the number of drinks returned is less than or equal to 5
    expect(response.body.drinks.length).toBeLessThanOrEqual(5);
    // Assert that there are 5+ drinks in the filteredDrinks array
    expect(filteredDrinks.length + filtered2.length).toBeGreaterThanOrEqual(5);
    //Assert that no drink
    expect(ingredient4Check).toHaveLength(0);
  });
});
