const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const moment = require("moment")

const User = require("../models/User")

async function loginAdmin(req, res) {
    const {username, password} = req.body
    try {
        const existingUser = await User.findOne({username: username})
        console.log(existingUser.password)
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

function checkAge(req, res) {
    const dob = moment(req.body.dob);
    const age = moment().diff(dob, 'years');

    if(age < 18) {
        res.status(403).json({message:"Thank you for your honesty, please return when you are 18 or over!"})
    } else {
        res.status(200).json({message: "Age verified, enjoy your drinks!"})
    }
}

module.exports = {
    loginAdmin,
    checkAge
}