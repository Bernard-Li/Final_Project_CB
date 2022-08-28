const { v4: uuidv4 } = require('uuid');
const { MongoClient } = require('mongodb');
require("dotenv").config();
const { MONGO_URI } = process.env;

const { cloudinary } = require('../utils/cloudinary');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const uploadImage = async (req, res) =>{
  try {
    const fileStr = await req.body.data;
    console.log(fileStr);

  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: 'error', error: error.message})
  }
}

module.exports = { uploadImage };