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
const createUser = async (req, res) =>{
  try {

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log('connected to client...');
    const db = client.db('SwivyUsers');
    
    
    const _id = uuidv4();
    const userBody = req.body;
    console.log(req.body);
    const data = {
      _id: _id,
      email: userBody.email,
      lastName: userBody.family_name,
      firstName: userBody.given_name,
      language: userBody.locale,
      userIcon: userBody.picture,
      userDate: userBody.updated_at
    };
    
    await db.collection('userData').insertOne(data);
    console.log(data);
    res.status(200).json({status: 201, _id, stats: "User created successfully", data: data})

  }
  catch (err){
    console.log(err.message);
    res.stats(400).json({status: "error", error: err.message})
  }

  client.close();
  console.log('disconnected from client');
};
//create a function that will go to the database and grab the current user? Double check with how Auth0 works
const currentUser = () =>{};

module.exports={ createUser, currentUser }