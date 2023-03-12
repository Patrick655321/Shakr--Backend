// Importing mongoose module
const mongoose = require("mongoose")

// Creating schema for ReturnMod
const ReturnModSchema = new mongoose.Schema({
vodka: String,
rum: String,
scotch: String,
bourbon: String,
tequila: String,
gin: String,
forbidden: Array,
test_spirit: String,
}, { versionKey: false })

// Creating model for ReturnMod with the schema created
const ReturnMod = mongoose.model("return_mods", ReturnModSchema)

// Exporting the ReturnMod model
module.exports = ReturnMod