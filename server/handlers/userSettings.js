
//This function will fetch the personalized settings that the user has stored to edit their travel card
const userSettings = async (req, res) => {
try {
  
} catch (error) {
  res.status(400).json({status: 'error', error: error});
}
}

module.exports = { userSettings };