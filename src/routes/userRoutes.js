const express = require("express")

const userRouter = express.Router()

const { loginAdmin, checkAge } = require("../controllers/userController")

userRouter.post("/user/login", loginAdmin)
userRouter.post("/user/over18", checkAge)

module.exports = userRouter
