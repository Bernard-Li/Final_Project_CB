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
    const uploadedReponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'swivy_uploads'
    })
    console.log(uploadedReponse);
    res.status(200).json({status: 'success', message: 'Image upload to Cloudinary complete'});

  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: 'error', error: error.message})
  }
}

module.exports = { uploadImage };