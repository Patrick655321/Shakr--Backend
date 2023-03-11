const express = require("express")

const {rebrandSpirit, getProducts, addToForbidden, removeForbiddenItem, getAllForbidden } = require("../controllers/returnModController")

const returnModRouter = express.Router()

returnModRouter.get("/products", getProducts)
returnModRouter.put("/products/brand/swap", rebrandSpirit)
returnModRouter.post("/products/forbidden/add", addToForbidden)
returnModRouter.get("/products/forbidden/all", getAllForbidden)
returnModRouter.patch("/products/forbidden/remove", removeForbiddenItem)


module.exports = returnModRouter