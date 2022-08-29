const { MongoClient } = require('mongodb');
require("dotenv").config();
const { MONGO_URI } = process.env;

const { cloudinary } = require('../utils/cloudinary');

//Required for new mongoclient declaration
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}


//Handler that will upload the image to cloudinary and store the image URL into the appropriate user quickLog Card
const quickLogUpload = async (req, res) =>{
  const client = new MongoClient(MONGO_URI, options);

  try {
    /*  IMPORTANT DECLARED VARIABLE
    The backend will ALWAYS be using the logged in users email to store information.
    idByEmail will be used as the key storing the value of the users email.
    Emails are unique, and can be stored both in the user - Auth0 in the front end,
    as well as objects in the backend. */
    const currentUser = await req.body.user.email;
    //The following will retrieve the encoded image from the data key, and upload the file to the designated folder in cloudinary
    const fileStr = await req.body.data;
    const uploadedReponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'swivy_uploads'
    })
    //**REMOVE** Verification console.logs 
    // console.log(uploadedReponse);
    console.log(currentUser);
    /*  format of the collection quickLog : { quickLog : [ {...}, {...}, ...] } 
        EXAMPLE:
        {
          quickLog: [
            { 
              _id: email
              media: photo_url
              data: {
                //information from the data form here
              }
            },
            { 
              _id: email
              media: photo_url
              data: {
                //information from the data form here
            },
            { ... }
          ]
    */
    await client.connect();
    const db = client.db('SwivyUsers');

    db.collection('quickLog').insertOne({
      _id: currentUser, //email of the current user through request
      media: uploadedReponse.url, //public url of the uploaded photo through request
      data: {
        destination: 'Test location: Montreal. Should retrieve from weather api?',
        information: 'Place holder for test, to be repalced with more precies key/value pairs'
      }
    })
    
    res.status(200).json({status: 'success', message: 'Image stored to user account successfully'});

  } catch (error) {
      console.log(error.message);
      res.status(400).json({ status: 'error', error: error.message})
  }
}

module.exports = { quickLogUpload };