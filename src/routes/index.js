const express = require("express")

const router = express.Router()
const { loginAdmin } = require("../controllers/adminControllers")



router.post("/api/login", loginAdmin)


module.exports = router
