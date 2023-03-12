// Importing required modules
require("dotenv").config(); //Load environment variables from .env file
const express = require("express");
const cors = require("cors"); //Middleware to enable Cross-Origin Resource Sharing (CORS)
const helmet = require("helmet"); //Middleware to secure the app by setting various HTTP headers

// Initializing express app
const app = express();

// Securing app using helmet
app.use(helmet());

// Parsing incoming requests with JSON payloads
app.use(express.json());
// Parsing incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

// Defining CORS options
const corsOption = {
  origin: "https://shkrapp.netlify.app/", //Origin that we want to accept (our frontend)
  optionSuccessStatus: 200,
};

// Applying CORS middleware to app
app.use(cors(corsOption));

// Defining port to listen on
const PORT = process.env.PORT || 5000;

// Defining route for homepage
app.get("/", (req, res) => {
  res.status(200).send("Welcome to my API");
});

// Applying userRoutes, drinkRoutes and returnModsRoutes to app
app.use(require("./routes/userRoutes"));
app.use(require("./routes/drinkRoutes"));
app.use(require("./routes/returnModsRoutes"));

// Exporting app and PORT to be used in server.js
module.exports = {
  app,
  PORT,
};
