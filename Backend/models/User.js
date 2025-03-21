//in this file we are creating the new user with the defined schema

const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required : true,
        unique: true
    },
    password:{
        type: String,
        required : true
    },
    date:{
        type: Date,
        default: Date.now
    }
  });
  const User = mongoose.model('user', userSchema);
  User.createIndexes();
  module.exports = mongoose.model('user', userSchema)