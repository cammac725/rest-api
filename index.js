require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const cookieParser = require('cookie-parser');

const routes = require('./routes/main');
const passwordRoutes = require('./routes/password')

const app = express();

const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`server is running on port: ${port}`)
});

// update express settings
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));
app.use(cookieParser());

// require passport auth
require('./auth/auth');

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
