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
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    // console.log('connected to client...');

    const db = client.db('SwivyUsers');
    const _id = uuidv4();
    const userBody = await req.body;
    const validateByEmail = await req.body.email;

    const existingUser = await db.collection('userData').findOne({email: validateByEmail});
    if(existingUser){
      // console.log('existing user has just logged in...');
      res.status(200).json({status: 200, status: "User logging in, validating by email: ", existingUser})
    }
    else {

      const data = {
        _id: _id,
      email: userBody.email,
      lastName: userBody.family_name,
      firstName: userBody.given_name,
      language: userBody.locale,
      userIcon: userBody.picture,
      userDate: userBody.updated_at,
      //quickLog is condensed version of travelCard
      quickLog: [
        {
          destination: null,
          imageSrc: null,
          weatherCapture: null,

        }
      ],
      //elaborate form containing all the information in quickLog + more
      travelCards: [
        {
          imageSrc: null
        }
      ]
    };
    
    // console.log(data);
    db.collection('userData').insertOne(data);
    res.status(200).json({status: 201, _id, status: "User created successfully", data: data})
  }
  
}
catch (err){
  console.log(err.message);
  res.status(400).json({status: "error", error: err.message})
}

// client.close();
// console.log('disconnected from client');
};


module.exports = { createUser };