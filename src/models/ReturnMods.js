const mongoose = require("mongoose")

const ReturnModSchema = new mongoose.Schema({
    vodka: String,
    white_rum: String,
    dark_rum: String,
    scotch: String,
    bourbon: String,
    tequila: String,
    gin: String,
    forbidden: Array
})

const ReturnMod = mongoose.model("return_mods", ReturnModSchema)

module.exports = ReturnMod