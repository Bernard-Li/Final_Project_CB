const express = require('express');
const PORT = 8000;

const { createUser } = require("./routes/handlers");

const app = express();

app.use(express.json());

app.get('/testlogin', (req, res) =>{
  
  res.status(200).json({status: 'success', data: 'here is the index'})
})

app.post('/create-user', createUser);

const server = app.listen(PORT, () =>{
  console.info("🌍 Listening on port: " + server.address().port);
});