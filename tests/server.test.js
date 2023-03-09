const request = require("supertest")
const { app } = require("../src/server")
const mongoose = require("mongoose")
const mongoURI = require("../src/server")
const ReturnMod = require("../src/models/ReturnMods")


beforeAll(async() => {
  await mongoose.connect("mongodb://127.0.0.1/shkr_db")
});

afterAll(async() => {
  await mongoose.connection.close()
});


//Testing homepage
// describe("Test homepage", () => {
//     it("shows welcome message", async() => {
//         const response = await request(app).get("/")
//         expect(response.statusCode).toBe(200)
//         expect(response.text).toEqual(expect.stringContaining("Welcome"))
//     })
// })

// describe("test getDrinkByName", () => {
//     it("each object in the array contains a key-value pair where strDrink contains 'margarita'", async() => {
//         const response = await request(app).get("/drinks/name/margarita")
//         const { drinks } = await response.body; 
//         expect(response.statusCode).toBe(200)
//         expect(Array.isArray(drinks)).toBe(true);
//         expect(response.body.drinks.length).toBeLessThanOrEqual(5);
//         drinks.forEach(drink => {
//             expect(drink.strDrink.toLowerCase()).toContain("margarita");
//         });
//     })
// })

describe("test getDrinkByBase", () => {
    it("Check to see if every object returned contains at least one ingredient that is 'vodka'", async() => {
        const response = await request(app).get("/drinks/base/vodka")
        const { drinks } = await response.body;
        const products = await ReturnMod.find({});
        console.log(drinks)
        console.log(products[0].vodka)
        expect(response.statusCode).toBe(200)
        expect(Array.isArray(drinks)).toBe(true);
        expect(response.body.drinks.length).toBeLessThanOrEqual(5);
        const hasVodka = drinks.some(drink => Object.values(drink).includes(products[0].vodka));
        expect(hasVodka).toBe(true);
    })
})