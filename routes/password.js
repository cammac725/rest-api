const express = require("express");
const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
const crypto = require('crypto');

const UserModel = require('../models/UserModel');

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
    defaultLayout: null,
    partialsDir: './templates/',
    layoutsDir: './templates/',
  },
  viewPath: path.resolve('./templates/'),
  extName: '.html',
};

smtpTransport.use('compile', hbs(handlebarsOptions));

const router = express.Router();

router.post("/forgot-pw", async (req, res) => {
  const userEmail = req.body.email;
  const user = await UserModel.findOne({ email: userEmail })
  if (!user) {
    res.status(400).json({ message: 'invalid email', status: 400 });
    return;
  }

  // create user token
  const buffer = crypto.randomBytes(20);
  const token = buffer.toString('hex');

  // update user reset password token and exp
  await UserModel.findByIdAndUpdate({ _id: user._id }, { resetToken: token, resetTokenExp: Date.now() + 600000 });

  // send user password reset email
  const emailOptions = {
    to: userEmail,
    from: email,
    template: 'forgot-pw',
    subject: 'Monster Morg Password Reset',
    context: {
      name: 'joe',
      url: `http://localhost:${process.env.PORT || 3000}`
    }
  }
  await smtpTransport.sendMail(emailOptions);

  res
    .status(200)
    .json({
      message: 'An email has been sent to your email address. Password link is only valid for 10 minutes.',
      status: 200,
    });
});

router.post("/reset-pw", async (req, res) => {
  if (!req.body || !req.body.email) {
    res.status(400).json({ message: "Invalid body", status: 400 });
  } else {
    const userEmail = req.body.email;

    // send user password update email
    const emailOptions = {
      to: userEmail,
      from: email,
      template: 'reset-pw',
      subject: 'Monster Morg Password Reset Confirmation',
      context: {
        name: 'joe',
      }
    }
    await smtpTransport.sendMail(emailOptions);

    res
      .status(200)
      .json({
        message: 'password updated',
        status: 200,
      });
  }
});

module.exports = router;
