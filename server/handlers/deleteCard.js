const { MongoClient } = require('mongodb');
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
const client = new MongoClient(MONGO_URI, options);

//Function that will delete a travel card from the database when the user clicks on the "Delete card" button on the front end
const deleteCard = async (req, res) => {
  const travelCard = req.params._id;
  try {
    await client.connect();
    const db = client.db('SwivyUsers');
    await db.collection('travelCard').deleteOne({ _id: travelCard});
    res.status(200).json({ status: 200, message: "Successfully deleted card"});
    
  } catch (error) {
      console.log(error);
      res.status(400).json({ status: 'error', error: error});
  }

}

module.exports = { deleteCard };