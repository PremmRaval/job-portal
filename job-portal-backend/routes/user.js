const express = require("express");
const router = express.Router();
const db = require("../lib/database.js");
const verifyToken = require("../helper/authentication.js");

router.get("/", verifyToken, (req, res, next) => {
  const { account_type } = req.user;
  res.status(200).json({ account_type: account_type });
});

module.exports = router;
