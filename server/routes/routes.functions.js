//This folder will contain all the "handler" functions for each route
//We will be retrieving user info from mongoDB

const { MongoClient } = require('mongodb');
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

//create a function that will go to the database and grab the current user
const currentUser = () =>{};

