const mongoose = require("mongoose")

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        },
        required: true,
    recipe: {
        type: Array,
        required: true
    }
})


const Recipe = mongoose.model("Recipe", RecipeSchema)

module.exports = Recipe