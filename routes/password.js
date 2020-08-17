const express = require("express");
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
