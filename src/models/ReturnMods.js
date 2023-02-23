const mongoose = require("mongoose")

const ModsSchema = new mongoose.Schema({
    drink_name: String,
    drink_rename: String,
    spirit: String,
    spirit_replace: String,
    is_invisible: Boolean,
})

const Mods = mongoose.model("Mods", ModsSchema)

module.exports = Mods