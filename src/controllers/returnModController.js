const ReturnMod = require("../models/ReturnMods");


async function getProducts(req, res) {
  try {
    const products = await ReturnMod.find({});
    res.json({products: products});
  } catch (error) {
    res.status(500).json({ message: "Unable to return mods" });
  }
}

async function rebrandSpirit(req, res) {
  try {
    const products = await ReturnMod.find({});
    const id = products[0]._id
    const { spiritName, newBrand } = req.body;
    const query = { _id: id }
    const options = { new: true }; // optional options object to return the updated document instead of the original
    const updatedProduct = await ReturnMod.findByIdAndUpdate(
      query, {
        [spiritName]: newBrand,
      }, options
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: "Error occurred" });
  }
}

async function addToForbidden(req, res) {
  const { drink } = req.body;
  const products = await ReturnMod.find({});
  const id = products[0]._id
  const query = { _id: id }; //query to find the return_mods document by its _id
  const update = { $push: { forbidden: drink } }; // update operation to push the new drink to the forbidden array
  const options = { new: true }; // optional options object to return the updated document instead of the original

  try {
    const updatedReturnMods = await ReturnMod.findOneAndUpdate(
      query,
      update,
      options
    );
    res.json(updatedReturnMods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function removeForbiddenItem(req, res) {
  const products = await ReturnMod.find({});
  const id = products[0]._id
  const { drink } = req.body;
  const query = { _id: id };
  const update = { $pull: { forbidden: drink } };
  const options = { new: true };

  try {
    const updatedReturnMods = await ReturnMod.findOneAndUpdate(
      query,
      update,
      options
    );
    res.json(updatedReturnMods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  rebrandSpirit,
  getProducts,
  addToForbidden,
  removeForbiddenItem,
}
