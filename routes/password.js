const express = require("express");
const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');

// create variables for email and password (in .env file)
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

// create transport object, inform nodemailer how to send emails
const smtpTransport = nodemailer.createTransport({
  service: process.env.EMAIL_PROVIDER,
  auth: {
    user: email,
    pass: password,
  },
});

// create handlebars options
const handlebarsOptions = {
  // what templating engine to use
  viewEngine: {
    extName: '.hbs',
    partialsDir: './templates/',
    layoutsDir: './templates/',
  },
  viewPath: path.resolve('./templates/'),
  extName: '.html',
};

smtpTransport.use('compile', hbs(handlebarsOptions));

const router = express.Router();

router.post("/forgot-pw", (req, res) => {
  if (!req.body || !req.body.email) {
    res.status(400).json({ message: "Invalid body", status: 400 });
  } else {
    const { email } = req.body;
    res
      .status(200)
      .json({
        message: `forgotten password requested for email: ${email}`,
        status: 200,
      });
  }
});

router.post("/reset-pw", (req, res) => {
  if (!req.body || !req.body.email) {
    res.status(400).json({ message: "Invalid body", status: 400 });
  } else {
    const { email } = req.body;
    res
      .status(200)
      .json({
        message: `password reset requested for email: ${email}`,
        status: 200,
      });
  }
});

module.exports = router;
