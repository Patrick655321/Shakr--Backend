const express = require("express")

const userRouter = express.Router()
const { loginAdmin } = require("../controllers/adminController")



userRouter.post("/api/login", loginAdmin)


module.exports = userRouter
