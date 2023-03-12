require ("dotenv").config()
const express = require("express")
const cors = require("cors")
const helmet = require("helmet")

const app = express();

app.use(helmet())

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const corsOption = {
    origin: ["http://localhost:3000", "https://shkrapp.netlify.app"], //Origin that we want to accept (our frontend)
    optionSuccessStatus: 200
}

app.use(cors(corsOption))

const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.status(200).send("Welcome to my API")
})

app.use(require("./routes/userRoutes"))
app.use(require("./routes/drinkRoutes"))
app.use(require("./routes/returnModsRoutes"))

module.exports = {
    app,
    PORT
}
