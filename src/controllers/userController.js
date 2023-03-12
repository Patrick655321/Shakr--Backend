const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const User = require("../models/User");

// This function handles the login functionality for an admin user
async function loginAdmin(req, res) {
  const { username, password } = req.body; // Destructure the request body to get the username and password
  try {
    // Find the user in the database using their username
    const existingUser = await User.findOne({ username: username });
    console.log(existingUser.password);

    // If the user does not exist, return an error
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid User" });
    }

    // If the user exists, compare the password provided with the password in the database
    const isValid = await bcrypt.compare(password, existingUser.password);

    // If the password is invalid, return an error
    if (!isValid) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    // If the password is valid, create a JWT token with the user's ID and send it as a response
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token });
  } catch (error) {
    // If an error occurs, return a generic error message
    res
      .status(500)
      .json({ message: "Internal server error, please try again" });
  }
}
// This function checks the age of the user based on their date of birth in the request body.
function checkAge(req, res) {
  const dob = moment(req.body.dob);
  const age = moment().diff(dob, "years");
  // If the user is under 18 , it sends a 403 Forbidden response with a message indicating that they cannot proceed.
  if (age < 18) {
    res
      .status(403)
      .json({
        message:
          "Thank you for your honesty, please return when you are 18 or over!",
      });
  } else {
    // If the user is 18 or over, it sends a 200 OK response with a message indicating that they can proceed.
    res.status(200).json({ message: "Age verified, enjoy your drinks!" });
  }
}

module.exports = {
  loginAdmin,
  checkAge,
};
