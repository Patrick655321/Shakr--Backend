const ReturnMod = require("../models/ReturnMods");


// Function to get a list of products
async function getProducts(req, res) {
  try {
    // Queries the database for all products and sends them as a JSON response
    const products = await ReturnMod.find({});
    res.json({ products: products });
  } catch (error) {
    res.status(500).json({ message: "Unable to return mods" });
  }
}

// This function is responsible for rebranding a spirit by updating the brand name in the database
async function rebrandSpirit(req, res) {
  try {
    const products = await ReturnMod.find({}); // Find all products from the database
    const id = products[0]._id; // Retrieve the id of the first product in the array
    const { spiritName, newBrand } = req.body; // Destructure the request body to retrieve the spirit name and new brand
    const query = { _id: id }; // Create a query object to find the product with the id
    const options = { new: true }; // Optional options object to return the updated document instead of the original
    // Update the product with the new brand information using findByIdAndUpdate method
    const updatedProduct = await ReturnMod.findByIdAndUpdate(
      query,
      {
        [spiritName]: newBrand,
      },
      options
    );
    res.json(updatedProduct); // Return the updated product as JSON
  } catch (err) {
    res.status(500).json({ message: "Error occurred" }); // Handle any errors that may occur during the process
  }
}

// This function handles adding a new drink to the "forbidden" list in the ReturnMod document
async function addToForbidden(req, res) {
  const { drink } = req.body; // Extracts the drink to be added to the forbidden list from the request body
  const products = await ReturnMod.find({}); // Retrieves all ReturnMod documents from the database
  const id = products[0]._id; // Gets the _id of the first ReturnMod document in the array
  const query = { _id: id }; // Defines the query to find the ReturnMod document by its _id
  const returnMod = await ReturnMod.findOne(query); // Finds the ReturnMod document that matches the query

  // Checks if the forbidden array in the ReturnMod document already includes the drink to be added
  if (returnMod.forbidden.includes(drink)) {
    return res.status(400).json({ error: "Drink already forbidden" }); // Returns an error response if the drink is already in the forbidden list
  }

  // Defines the update operation to push the new drink to the forbidden array
  const update = { $push: { forbidden: drink } };

  // Optional options object to return the updated document instead of the original
  const options = { new: true };

  try {
    // Updates the ReturnMod document with the new forbidden drink
    const updatedReturnMods = await ReturnMod.findOneAndUpdate(
      query,
      update,
      options
    );
    res.json(updatedReturnMods); // Returns the updated ReturnMod document as a response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" }); // Returns an error response if there was an error updating the document
  }
}

// This function removes an item from the forbidden drinks list in the ReturnMod document in the database.
// It takes a request object and a response object as arguments.
async function removeForbiddenItem(req, res) {
  const products = await ReturnMod.find({});
  const id = products[0]._id; // get the ID of the ReturnMod document
  const { drink } = req.body; // get the drink to remove from the request body
  const query = { _id: id }; // query to find the ReturnMod document by its ID
  const update = { $pull: { forbidden: drink } }; // update operation to pull the drink from the forbidden array
  const options = { new: true }; // return the updated document instead of the original

  try {
    const updatedReturnMods = await ReturnMod.findOneAndUpdate(
      query,
      update,
      options
    );
    res.json(updatedReturnMods); // return the updated ReturnMod document
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getAllForbidden(req, res) {
    console.log("getting all forbidden on the back end");
    try {
        const cocktailsAllTogether = await ReturnMod.find();
        const forbiddenCocktails = cocktailsAllTogether[0]["forbidden"];
        console.log("all forbidden cocktails sent from back end")
        console.log(forbiddenCocktails);
        res.json(forbiddenCocktails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

// export modules to other pages
module.exports = {
  rebrandSpirit,
  getProducts,
  addToForbidden,
  removeForbiddenItem,
  getAllForbidden
};
