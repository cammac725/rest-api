const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send("Got it, man!")
})

app.get('/status', (req, res) => { 
  res.status(200).json({ message: 'Check!', status: 200})
})

app.post('/signup', (req, res) => {
  res.status(200).json({ message: 'Posted!', status: 200 })
})

app.listen(port, () => {
  console.log(`server is running on port: ${port}`)
})