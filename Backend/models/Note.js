//in this file a user would be able to create a ne note with the given schema
const mongoose = require('mongoose');

// Schema is logical collection of database
const noteSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user'
        // This is similar to foreign key of mySql, whcih is unique for each user
        // This will help to restict each user to its data only...
    },
    title:{
        type: String,
        required : true
    },
    description:{
        type: String,
        required : true,
        unique: true
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    }
  });
  module.exports = mongoose.model('note', noteSchema)