const ReturnMod = require("../models/ReturnMods");

async function getProducts(req, res) {
    try {
        const products = await ReturnMod.find({});
        res.json({ products: products });
    } catch (error) {
        res.status(500).json({ message: "Unable to return mods" });
    }
}

async function rebrandSpirit(req, res) {
    try {
        const products = await ReturnMod.find({});
        const id = products[0]._id;
        const { fieldName, fieldValue } = req.body;
        console.log("fieldName:", fieldName);
        console.log("fieldValue:", fieldValue);
        const query = { _id: id };
        const options = { new: true }; // optional options object to return the updated document instead of the original
        const updatedProduct = await ReturnMod.findByIdAndUpdate(
            query,
            {
                [fieldName]: fieldValue,
            },
            options
        );
        console.log(updatedProduct);
        res.json(updatedProduct);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error occurred" });
    }
}

async function addToForbidden(req, res) {
    console.log(req.body);
    const { drink } = req.body;
    const products = await ReturnMod.find({});
    console.log(products);
    const id = products[0]._id;
    const query = { _id: id }; //query to find the return_mods document by its _id
    const update = { $push: { forbidden: drink } }; // update operation to push the new drink to the forbidden array
    const options = { new: true }; // optional options object to return the updated document instead of the original

    try {
        const updatedReturnMods = await ReturnMod.findOneAndUpdate(
            query,
            update,
            options
        );
        console.log(updatedReturnMods);
        res.json(updatedReturnMods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function removeForbiddenItem(req, res) {
    
    const products = await ReturnMod.find({});
    const id = products[0]._id;
    const { drink } = req.body;
    console.log(drink + "removing drink");
    console.log(id + "drink id");

    const query = { _id: id };
    const update = { $pull: { forbidden: drink } };
    const options = { new: true };

    try {
        const updatedReturnMods = await ReturnMod.findOneAndUpdate(
            query,
            update,
            options
        );
        console.log(updatedReturnMods + "updated return mods");
        res.json(updatedReturnMods);
        // res.send(drink);
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

module.exports = {
    rebrandSpirit,
    getProducts,
    addToForbidden,
    removeForbiddenItem,
    getAllForbidden,
};
