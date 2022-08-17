const express = require('express');
const PORT = 8000;

const app = express();

app.use(express.json());

app.get('/', (req, res) =>{
  res.send('Server has started');
})
const server = app.listen(PORT, () =>{
  console.info("🌍 Listening on port: " + server.address().port);
});