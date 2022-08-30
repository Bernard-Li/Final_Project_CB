const { MongoClient } = require('mongodb');
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

//Function handler that will retrieve all the quicklogs for a designated user
const allTravelCards = async (req, res) =>{
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    
    const db = client.db('SwivyUsers');
    const travelCardArray = await db.collection('travelCard').find().toArray();
    res.status(200).json({status: 200, data: travelCardArray});

  } catch (error) {
      console.log(error.message);
      res.status(400).json({ status: 'error', error: error.message})
  }


}
module.exports = { allTravelCards };