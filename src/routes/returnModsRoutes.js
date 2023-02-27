const express = require("express")

const {rebrandSpirit, getProducts, addToForbidden } = require("../controllers/returnModController")

const returnModRouter = express.Router()

returnModRouter.get("/products", getProducts)
returnModRouter.put("/products/:id/", rebrandSpirit)
returnModRouter.put("/forbidden/add/", addToForbidden)


module.exports = returnModRouter