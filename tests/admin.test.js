// Importing necessary modules and files
const request = require("supertest");
const { app } = require("../src/server");
const mongoose = require("mongoose");

// Establishing a connection with the database before running the tests
beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1/shkr_db");
});

// Closing the database connection and waiting for 100ms after running the tests
afterAll(async () => {
  await mongoose.connection.close();
  await new Promise((resolve) => setTimeout(() => resolve(), 100));
});

// Testing the "PUT /products/swap" endpoint
describe("PUT /products/swap", () => {
  it("swaps brands out", async () => {
    // Sending a request to the endpoint to swap a brand and receiving a response
    const response = await request(app).put("/products/brand/swap").send({
      spiritName: "test_spirit",
      newBrand: "Old Mate Patty's Mountain Moonshine!",
    });
    // Checking if the response status code is 200 and the spirit's brand is changed to the new brand
    expect(response.statusCode).toBe(200);
    expect(response.body.test_spirit).toEqual(
      "Old Mate Patty's Mountain Moonshine!"
    );
  });
});

// Testing the "POST /products/forbidden/add" endpoint
describe("POST /products/forbidden/add", () => {
  it("add item to forbidden array", async () => {
    // Sending a request to the endpoint to add an item to the forbidden array and receiving a response
    const response = await request(app).post("/products/forbidden/add").send({
      drink: "Rocket fuel",
    });
    // Checking if the response status code is 200 and the last item of the forbidden array is the added item
    expect(response.statusCode).toBe(200);
    expect(response.body.forbidden[response.body.forbidden.length - 1]).toEqual(
      "Rocket fuel"
    );
    // Sending a request to add the same item again and checking if the response status code is 400 (Bad Request)
    const failResponse = await request(app)
      .post("/products/forbidden/add")
      .send({ drink: "Rocket fuel" });
    expect(failResponse.status).toBe(400);
  });
});

// Testing the "PATCH /products/forbidden/remove" endpoint
describe("PATCH /products/forbidden/remove", () => {
  it("remove item from forbidden array", async () => {
    // Sending a request to the endpoint to remove an item from the forbidden array and receiving a response
    const response = await request(app)
      .patch("/products/forbidden/remove")
      .send({
        drink: "Rocket fuel",
      });
    // Checking if the response status code is 200 and the forbidden array does not contain the removed item
    expect(response.statusCode).toBe(200);
    expect(response.body.forbidden.includes("Rocket fuel")).toBe(false);
  });
});
