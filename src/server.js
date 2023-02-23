require ("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")


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

const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.send("Welcome to my API")
})

app.use(require("./routes"))

app.listen(PORT, () => {
    console.log("Server Started")
})