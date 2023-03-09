const mongoose = require("mongoose")
const { app, PORT, mongoURI } = require("./server")

app.listen(PORT, () => {
    console.log("Server Started")
    mongoose.set('strictQuery', false)
    mongoose.connect(mongoURI)
    .then(() => {
        console.log("DB connected")
    })
    .catch((err) => {
        console.log(err)
    })
})
