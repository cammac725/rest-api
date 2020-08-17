const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send("Got it, man!");
});

app.get('/status', (req, res) => { 
  res.status(200).json({ message: 'Check!', status: 200});
});

app.post('/signup', (req, res) => {
  res.status(200).json({ message: 'Posted!', status: 200 });
});

app.post('/login', (req, res) => {
  res.status(200).json({ message: 'Posted!', status: 200 });
});

app.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Posted!', status: 200 });
});

app.post('/token', (req, res) => {
  res.status(200).json({ message: 'Posted!', status: 200 });
});

app.post('/forgot-pw', (req, res) => {
  res.status(200).json({ message: 'Posted!', status: 200 });
});

app.post('/reset-pw', (req, res) => {
  res.status(200).json({ message: 'Posted!', status: 200 });
});

// catch all other routes
app.use((req, res) => {
  res.status(404).json({ message: '404 - Not Found', status: 404 });
});

// handle errors
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({ err: err.message, status: 500 });
});



app.listen(port, () => {
  console.log(`server is running on port: ${port}`)
});