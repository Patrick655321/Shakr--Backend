const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

async function loginAdmin(req, res) {
    const {email, password} = req.body
    try {
        const existingUser = await User.findOne({email: email})
        if(!existingUser) {
            return res.status(400).json({message: "Invalid User"})
        }
        const isValid = await bcrypt.compare(password, existingUser.password)
        if(!isValid) {
            return res.status(400).json({message: "Invalid Password"})
        }
        const token = jwt.sign({id: existingUser._id}, process.env.JWT_SECRET, {expiresIn: "1d"})
        res.json({token})
    } catch (error) {
        res.status(500).json({message: "Internal server error, please try again"})
    }
}

let password = "password"
bcrypt.hash(password, 10, (err, hash) => {
    if(err) {
        console.log(err)
    }
    console.log(hash)
})

module.exports = {
    loginAdmin
}