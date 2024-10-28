const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/login-tut")

//shck database connection

connect.then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

    // create schema for users

    const loginSchema = new mongoose.Schema({
        name: {type: String, required: true},
        password: {type: String, required: true}
    });

  //collection part 
  
  const collection = new mongoose.model("users",loginSchema)

  module.exports = collection;