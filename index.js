const express = require('express');
const bodyParser = require('body-parser')

const routes = require('./routes/main');
const passwordRoutes = require('./routes/password')

const app = express();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running on port: ${port}`)
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// setup routes
app.use('/', routes);
app.use('/', passwordRoutes);

// catch all other routes
app.use((req, res) => {
  res.status(404).json({ message: '404 - Not Found', status: 404 });
});

// handle errors
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({ err: err.message, status: 500 });
});
