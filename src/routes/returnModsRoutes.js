// Import the express package
const express = require("express");

// Import the controllers for handling routes
const {
  rebrandSpirit,
  getProducts,
  addToForbidden,
  removeForbiddenItem,
  getAllForbidden
} = require("../controllers/returnModController");

// Create a new router instance
const returnModRouter = express.Router();

// Define the routes for handling requests
returnModRouter.get("/products", getProducts); // Route for getting all products
returnModRouter.put("/products/brand/swap", rebrandSpirit); // Route for swapping spirit brand
returnModRouter.post("/products/forbidden/add", addToForbidden); // Route for adding an item to the forbidden list
returnModRouter.patch("/products/forbidden/remove", removeForbiddenItem); // Route for removing an item from the forbidden list
returnModRouter.get("/products/forbidden/all", getAllForbidden) //Route for returning forbidden array


// Export the router to be used in the main application
module.exports = returnModRouter;
