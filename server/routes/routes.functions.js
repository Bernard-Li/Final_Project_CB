//This folder will contain all the "handler" functions for each route
//We will be retrieving user info from mongoDB

//Using this package to generate random ID's when a new user is created.
//Stored in mongoDB collectin: uniqueId
const {v4: uuidv4 } = require('uuid');
const { MongoClient } = require('mongodb');
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
//create a function that will allow a user to create an account 
const createUser = () =>{};
//create a function that will go to the database and grab the current user? Double check with how Auth0 works
const currentUser = () =>{};

