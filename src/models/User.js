const mongoose = require("mongoose")

// Define the User schema
const UserSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
})

// Create the User model
const User = mongoose.model("User", UserSchema)

// Export the User model for use in other modules
module.exports = User