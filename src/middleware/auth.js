require("dotenv").config();
const jwt = require("jsonwebtoken");

// This function checks if an authorization token is present in the header of a request and verifies it
// If the token is valid, the decoded user ID is added to the request object and passed to the next middleware
// If the token is missing or invalid, an appropriate error message is sent in the response
function authenticateToken(req, res, next) {
  const token = req.headers["auth-token"];
  // Check if token is present in headers
  if (!token) {
    return res.status(403).json({ message: "Auth token missing" });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add the decoded user ID to the request object
    req.user = decoded;
  } catch (error) {
    // If token verification fails, send an unauthorized error message
    return res.status(401).json({ message: "Not authorized" });
  }
  // Call the next middleware in the chain
  return next();
}

module.exports = { authenticateToken };
