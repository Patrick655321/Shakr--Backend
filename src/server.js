require ("dotenv").config()
const express = require("express")
const cors = require("cors")


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const corsOption = {
    origin: ["*"], //Origin that we want to accept (our frontend)
    optionSuccessStatus: 200
}

app.use(cors( corsOption))

const mongoURI = process.env.MONGO_URI
const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.send("Welcome to my API")
})

app.use(require("./routes/userRoutes"))
app.use(require("./routes/drinkRoutes"))
app.use(require("./routes/returnModsRoutes"))

module.exports = {
    app,
    PORT,
    mongoURI
}
