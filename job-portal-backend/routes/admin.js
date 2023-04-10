const express = require("express");
const router = express.Router();
const db = require("../lib/database.js");
const { generateAccessToken } = require("../helper/shared.js");
const bcrypt = require("bcrypt");
const verifyToken = require("../helper/authentication.js");

router.get("/", (req, res, next) => {
  res.status(200).send("admin");
});

router.post("/sign-in", (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const query = "SELECT * FROM admin WHERE email = ?";
  db.query(query, [email], (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "An error occurred while retrieving user data." });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check if password is correct
    const user = results[0];
    bcrypt.compare(password, user.password, (error, result) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "An error occurred while verifying password." });
      }

      if (!result) {
        return res.status(401).json({ error: "Invalid email or password." });
      }

      // Generate JWT token and send back to client
      const token = generateAccessToken({
        id: user.id,
        email: user.email,
        account_type: 2,
      });
      return res.json({ token: token });
    });
  });
});

router.get("/users-in-process-state", verifyToken, (req, res, next) => {
  const query = "SELECT * FROM candidate WHERE account_status = 0";
  db.query(query, (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "An error occurred while retrieving user data." });
    }

    return res.status(200).json({ users: results });
  });
});

router.post("/update-user-state", verifyToken, (req, res, next) => {
  const { id, status } = req.body;

  const query = "UPDATE candidate SET account_status = ? where id = ? ";
  db.query(query, [status, id], (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "An error occurred while retrieving user data." });
    }

    return res.status(200).json({ message: "user status updated sucessfully" });
  });
});

module.exports = router;
