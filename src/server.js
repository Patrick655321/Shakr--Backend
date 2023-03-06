require ("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const mongoURI = process.env.MONGO_URI
mongoose.connect(mongoURI)
    .then(() => {
        console.log("DB connected")
    })
    .catch((err) => {
        console.log(err)
    })

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const corsOption = {
    origin: ["http://localhost:3000"], //Origin that we want to accept (our frontend)
    optionSuccessStatus: 200
}

app.use(cors(corsOption))

const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.send("Welcome to my API")
})

app.use(require("./routes/userRoutes"))
app.use(require("./routes/drinkRoutes"))
app.use(require("./routes/returnModsRoutes"))

app.listen(PORT, () => {
    console.log("Server Started")
})