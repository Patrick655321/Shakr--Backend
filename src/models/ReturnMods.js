const mongoose = require("mongoose")

const ReturnModsSchema = new mongoose.Schema({
    vodka: String,
    white_rum: String,
    dark_rum: String,
    scotch: String,
    bourbon: String,
    tequila: String,
    gin: String,
    do_not_return: Array
})

const ReturnMods = mongoose.model("return_mods", ReturnModsSchema)

module.exports = ReturnMods