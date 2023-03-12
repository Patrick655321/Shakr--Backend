// Import the required modules
const mongoose = require("mongoose");
const { app, PORT } = require("./server");

// Start the server listening on the specified port
app.listen(PORT, () => {
  console.log("Server Started");
  // Disable strict mode in Mongoose to avoid deprecation warnings
  mongoose.set("strictQuery", false);
  // Connect to the MongoDB database using the connection string from the environment variables
  mongoose.connect(process.env.MONGO_URI, () => {
    console.log("DB connected");
  });
});
