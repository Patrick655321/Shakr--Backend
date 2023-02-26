const express = require("express")

const {rebrandSpirit, getProducts } = require("../controllers/returnModController")

const returnModRouter = express.Router()

returnModRouter.get("/products", getProducts)
returnModRouter.put("/products/:id/", rebrandSpirit)


module.exports = returnModRouter