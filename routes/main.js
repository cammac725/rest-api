const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Got it, man!");
});

router.get("/status", (req, res) => {
  res.status(200).json({ message: "Check!", status: 200 });
});

router.post("/signup", (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ message: "Invalid body", status: 400 });
  } else {
    res.status(200).json({ message: "Posted!", status: 200 });
  }
});

router.post("/login", (req, res) => {
  if (!req.body) {
    res.status(400).json({ message: "Invalid body", status: 400 });
  } else {
    res.status(200).json({ message: "Posted!", status: 200 });
  }
});

router.post("/logout", (req, res) => {
  if (!req.body) {
    res.status(400).json({ message: "Invalid body", status: 400 });
  } else {
    res.status(200).json({ message: "Posted!", status: 200 });
  }
});

router.post("/token", (req, res) => {
  if (!req.body || !req.body.refreshToken) {
    res.status(400).json({ message: "Invalid body", status: 400 });
  } else {
    const { refreshToken } = req.body;
    res
      .status(200)
      .json({
        message: `refresh token requested for token: ${refreshToken}`,
        status: 200,
      });
  }
});

module.exports = router;