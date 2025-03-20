const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/iNotebook";
//by dedfault it sends the data into users i.s.->/iNoteBook.users

// mongo return promises
async function connectToMongo() {
  await mongoose.connect(mongoURI)
    .then(() => console.log("Connected to Mongo Successfully"))
    .catch((err) => console.log(err));
}

module.exports = connectToMongo;
// this code simply hely to connect to database
