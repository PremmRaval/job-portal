const express = require("express");
const router = express.Router();
const db = require("../lib/database.js");
const { generateAccessToken } = require("../helper/shared.js");
const bcrypt = require("bcrypt");
const multer = require("multer");
const verifyToken = require("../helper/authentication.js");

// Create a multer storage object with disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", (req, res, next) => {
  res.status(200).send("candidate");
});

router.post("/sign-in", (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const query = "SELECT * FROM organization WHERE email = ?";
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
        account_type: 1,
      });
      return res.json({ token: token });
    });
  });
});

router.post("/upload-logo", upload.single("file"), (req, res) => {
  const file = req.file;
  const fileName = file.filename;
  res
    .status(200)
    .json({ fileName: fileName, message: "File uploaded successfully" });
});

router.post("/sign-up", (req, res, next) => {
  // Get the form data from the request body
  const { name, email, password, logo } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  bcrypt.hash(password, 1, (err, hash) => {
    const query = `INSERT INTO organization (name, email, password, logo) 
    VALUES (?, ?, ?, ?)`;
    db.query(query, [name, email, hash, logo], (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "An error occurred while creating user." });
      }

      res.status(201).json({ message: "User signed up successfully" });
    });
  });
});

router.post("/post-job", verifyToken, (req, res, next) => {
  // Get the form data from the request body
  const {
    title,
    company,
    description,
    location,
    type,
    salary,
    contactName,
    contactEmail,
    contactPhone,
  } = req.body;

  const { id } = req.user;

  const query = `INSERT INTO job (title, company, description, location, type, salary, contactName, contactEmail, contactPhone, org_id) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    query,
    [
      title,
      company,
      description,
      location,
      type,
      salary,
      contactName,
      contactEmail,
      contactPhone,
      id,
    ],
    (error, results) => {
      if (error) {
        console.log(`\u001b[31m[ERR] ${error}`);
        return res
          .status(500)
          .json({ error: "An error occurred while creating user." });
      }

      res.status(201).json({ message: "Job posting added successfully" });
    }
  );
});

router.get("/get-jobs", verifyToken, (req, res, next) => {
  const { id } = req.user;

  const query = `SELECT * FROM job WHERE org_id = ?`;
  db.query(query, [id], (error, results) => {
    if (error) {
      console.log(`\u001b[31m[ERR] ${error}`);
      return res
        .status(500)
        .json({ error: "An error occurred while creating user." });
    }

    res.status(201).json(results);
  });
});

router.get("/get-applications", verifyToken, (req, res, next) => {
  const { id } = req.user;

  const query = `SELECT DISTINCT c.id as user_id, j.id as job_id, a.id as application_id,
  CONCAT(c.first_name, " ", c.last_name) as name, c.first_name, c.last_name, c.email, c.phone, c.age, 
  c.certificate_path, c.resume_path, j.title, j.company, j.description, j.location, j.type, 
  j.salary, j.contactName, j.contactEmail, j.contactPhone, j.date_published, a.date as application_date, a.experience
  FROM candidate c
  INNER JOIN application a ON c.id = a.applicant_id AND a.application_status = 0
  INNER JOIN job j ON a.job_id = j.id
  INNER JOIN organization o ON j.org_id = o.id
  WHERE o.id = ?
  ORDER BY job_id`;
  db.query(query, [id], (error, results) => {
    if (error) {
      console.log(`\u001b[31m[ERR] ${error}`);
      return res
        .status(500)
        .json({ error: "An error occurred while creating user." });
    }

    res.status(201).json(results);
  });
});

router.post("/update-application", verifyToken, (req, res, next) => {
  const { application_id, candidate_id, status } = req.body;

  const query = `UPDATE application set application_status = ? where id = ? and applicant_id = ?`;
  db.query(query, [status, application_id, candidate_id], (error, results) => {
    if (error) {
      console.log(`\u001b[31m[ERR] ${error}`);
      return res
        .status(500)
        .json({ error: "An error occurred while creating user." });
    }

    res.status(201).json(results);
  });
});

module.exports = router;
