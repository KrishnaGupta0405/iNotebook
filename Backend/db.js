const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/";

// mongo return promises
async function connectToMongo() {
  await mongoose
    .connect(mongoURI)
    .then(() => console.log("Connected to Mongo Successfully"))
    .catch((err) => console.log(err));
}

module.exports = connectToMongo;
// this code simply hely to connect to database
