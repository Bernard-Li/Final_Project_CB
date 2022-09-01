const {v4: uuidv4 } = require('uuid');
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
const travelCardUpload = async (req, res) =>{
  const client = new MongoClient(MONGO_URI, options);

  try {
    /*  IMPORTANT DECLARED VARIABLE
    The backend will ALWAYS be using the logged in users email to store information.
    idByEmail will be used as the key storing the value of the users email.
    Emails are unique, and can be stored both in the user - Auth0 in the front end,
    as well as objects in the backend. */
    const currentUser = await req.body.user.email;

    const formData = await req.body.form;
    const fileCheck = await req.body.data;
    //The following will retrieve the encoded image from the data key, and upload the file to the designated folder in cloudinary
    let uploadedResponse = '';
    if(fileCheck){
      const fileStr = await req.body.data;
      uploadedResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: 'swivy_uploads'
      })
    }
      //**REMOVE** Verification console.logs 
      // console.log(uploadedReponse);
      // console.log(currentUser);
      
    await client.connect();
    const db = client.db('SwivyUsers');
    const uniqueId = uuidv4();
    db.collection('travelCard').insertOne({
      _id: uniqueId, 
      user_id: currentUser, //email of the current user through request
      media: uploadedResponse.url || 'no-media-selected', //public url of the uploaded photo through request
      data: {
        destination: formData.destination,
        created: formData.dateCreated,
        date: [formData.dateTraveled],
        forecast: formData.forecast,
        activity: formData.activity,
        notes: formData.notes,
      }
    })
  
    
    res.status(200).json({status: 'success', message: 'Image stored to user account successfully'});

  } catch (error) {
      console.log(error);
      res.status(400).json({ status: 'error', error: error})
  }
}

module.exports = { travelCardUpload };