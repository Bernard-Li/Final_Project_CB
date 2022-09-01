const { MongoClient } = require('mongodb');
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

//Function that will fetch all the travelCards from the databse. the filter param will dictate how the information will be organized
//By default, the cards will be rendered based on first created - last created
const allTravelCards = async (req, res) => {
  const filter = req.query.filter;
  const email = req.query.user;
  console.log(email);
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    
    const db = client.db('SwivyUsers');
    const travelCardArray = await db.collection('travelCard').find({ user_id: email}).toArray();

    //SWITCH to capture the filter param from the front end. Based on the drop down that the user selects as a filter
    switch (filter) {
      //case for the most recent travels (start date only)
      case 'dateNewFirst' :
        travelCardArray.sort(( a, b ) => {
        const first = new Date(a.data.date[0][0]);
        const second = new Date(b.data.date[0][0]);
        return second - first;
      })
      return res.status(200).json({status: 200, data: travelCardArray});
      //case for the oldest travel cards by travel date (start date only)
      case 'dateOldFirst' :
        travelCardArray.sort(( a, b ) => {
        const first = new Date(a.data.date[0][0]);
        const second = new Date(b.data.date[0][0]);
        return first - second;
      })
      return res.status(200).json({status: 200, data: travelCardArray});
      //A-Z sorting, in this case a function that sorts the destination by alphabetical order
      case 'alphaSort':
        travelCardArray.sort(( a, b ) => {
          const first = a.data.destination;
          const second = b.data.destination;
          if(first < second){
            return -1;
          }
          if(first > second){
            return 1;
          }
        })
        return res.status(200).json({status: 200, data: travelCardArray})
      //this case will reverse the alphabetical order
      case 'alphaSortBackwards':
        travelCardArray.sort(( a, b ) => {
          const first = a.data.destination;
          const second = b.data.destination;
          if(first < second){
            return 1;
          }
          if(first > second){
            return -1;
          }
        })
        return res.status(200).json({status: 200, data: travelCardArray})
      //the default case will be the cards by creation date, which is how they are going to be stored into the mongoDB on creation
      default:
        res.status(200).json({status: 200, data: travelCardArray})
    }
    
    // const filterByDestination = travelCardArray.map((card, index) =>{
    //   return card.data.destination //string that has the city name
    // })
    // console.log(filterByDestination.sort());
    
    
    
    // res.status(200).json({status: 200, data: travelCardArray});
    //quicker to use mongo query .find vs filter in the backend
  } catch (error) {
      console.log(error.message);
      res.status(400).json({ status: 'error', error: error.message})
  }


}
module.exports = { allTravelCards };