const express = require("express")

const userRouter = express.Router()

// Import user controller functions for handling requests
const { loginAdmin, checkAge } = require("../controllers/userController")

// Define HTTP routes and map them to controller functions
userRouter.post("/user/login", loginAdmin)  // Login route for admin users
userRouter.post("/user/over18", checkAge)   // Age verification route

module.exports = userRouter  // Export the router instance