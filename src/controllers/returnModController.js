const ReturnMod = require("../models/returnMods");

async function getProducts(req, res) {
    try {
        const products = await ReturnMod.find({})
        res.json(products)
    } catch (error) {
        res.status(500).json({message: "Unable to return mods"})
    }
}

async function rebrandSpirit(req, res) {
  try {
    const { vodka, white_rum, dark_rum, scotch, bourbon, tequila, gin } =
      req.body;
    const updatedProduct = await ReturnMod.findByIdAndUpdate(req.params.id, {
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

async function addToForbidden(req, res) {
  try {
    const newItem = req.body.newItem
    console.log(newItem)
    await ReturnMod.findOneAndUpdate(
      {_id: '63f88181b7c64bc89b59351c'},
      { $push: {forbidden: newItem} })
      res.status(200).send(newItem)
    } catch (err) {
      res.status(500).json({message:"no ciggie"})
    }
  }



module.exports = {
  rebrandSpirit,
  getProducts,
  addToForbidden
};
