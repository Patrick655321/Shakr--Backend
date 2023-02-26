const ReturnMods = require("../models/returnMods");

async function getProducts(req, res) {
    try {
        const products = await ReturnMods.find({})
        res.json(products)
    } catch (error) {
        res.status(500).json({message: "Unable to return mods"})
    }
}

async function rebrandSpirit(req, res) {
  try {
    const { vodka, white_rum, dark_rum, scotch, bourbon, tequila, gin } =
      req.body;
    const updatedProduct = await ReturnMods.findByIdAndUpdate(req.params.id, {
      vodka,
      white_rum,
      dark_rum,
      scotch,
      bourbon,
      tequila,
      gin,
    });
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({message: "Error occured"});
  }
}

module.exports = {
  rebrandSpirit,
  getProducts
};
