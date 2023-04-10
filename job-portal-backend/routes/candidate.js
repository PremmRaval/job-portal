const express = require("express");
const router = express.Router();
const db = require("../lib/database.js");
const { generateAccessToken } = require("../helper/shared");
const bcrypt = require("bcrypt");
const multer = require("multer");
const verifyToken = require("../helper/authentication.js");

const certificatesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/certificates/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const certificatesUpload = multer({ storage: certificatesStorage });

const resumeStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/resumes/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const resumeUpload = multer({ storage: resumeStorage });

router.get("/", (req, res, next) => {
  res.status(200).send("candidate");
});

router.post("/sign-in", (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const query = "SELECT * FROM candidate WHERE email = ?";
  db.query(query, [email], (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "An error occurred while retrieving user data." });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    if (results[0].account_status === 0) {
      return res.status(401).json({
        error: `Oops! It seems like your account is not yet approved. 
            Please contact our support team for further assistance or wait for up to 1 business day for your account to be approved. 
            Thank you for your patience.`,
      });
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
        account_type: 0,
      });
      return res.json({ token: token });
    });
  });
});

router.post(
  "/upload-certificate",
  certificatesUpload.single("file"),
  (req, res) => {
    const file = req.file;
    const fileName = file.filename;
    res
      .status(200)
      .json({ fileName: fileName, message: "File uploaded successfully" });
  }
);

router.post("/sign-up", (req, res, next) => {
  const { firstName, lastName, email, password, phone, age, certificate_path } =
    req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  // Check if email and password are provided
  if (!certificate_path) {
    return res.status(400).json({ error: "Certificate is required." });
  }

  let query = `SELECT * FROM candidate where email = ?`;
  db.query(query, [email], (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "An error occurred while inserting user data." });
    }

    if(results.length > 0) {
      res.status(409).json({ error: "This email address is already in use. Please choose a different one." });
    }
  });

  bcrypt.hash(password, 1, (err, hash) => {
    query = `INSERT INTO candidate(first_name, last_name, email, phone, password, age, certificate_path)
    VALUES(?, ?, ?, ?, ?, ?, ?)`;
    db.query(
      query,
      [firstName, lastName, email, phone, hash, age, certificate_path],
      (error, results) => {
        if (error) {
          return res
            .status(500)
            .json({ error: "An error occurred while inserting user data." });
        }

        res.status(201).json({ message: "User signed up successfully" });
      }
    );
  });
});

router.get("/jobs", verifyToken, (req, res, next) => {
  const { id } = req.user;

  const query = `SELECT j.*, o.logo as company_logo FROM job j LEFT JOIN application a ON j.id = a.job_id AND a.applicant_id = ?
  JOIN organization o ON j.org_id = o.id WHERE a.job_id IS NULL`;
  db.query(query, [id], (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "An error occurred while retrieving user data." });
    }

    res.status(201).json(results);
  });
});

router.get("/applied-jobs", verifyToken, (req, res, next) => {
  const { id } = req.user;

  const query = `SELECT * FROM application a JOIN job j on a.job_id = j.id 
  JOIN candidate c ON a.applicant_id = c.id WHERE a.applicant_id = ?`;
  db.query(query, [id], (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "An error occurred while retrieving user data." });
    }

    res.status(201).json(results);
  });
});

router.post("/apply-job", verifyToken, (req, res, next) => {
  const { id } = req.user;
  const { jobID, experience } = req.body;

  const query = `INSERT INTO application(experience, job_id, applicant_id) VALUES (?, ?, ?)`;
  db.query(query, [experience, jobID, id], (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "An error occurred while retrieving user data." });
    }

    res.status(201).json(results);
  });
});

router.get("/profile", verifyToken, (req, res, next) => {
  const { id } = req.user;

  const query = `SELECT * FROM candidate WHERE id = ?`;
  db.query(query, [id], (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "An error occurred while retrieving user data." });
    }

    res.status(200).json(results[0]);
  });
});

router.post(
  "/upload-resume",
  verifyToken,
  resumeUpload.single("file"),
  (req, res, next) => {
    const { id } = req.user;
    const file = req.file;
    const fileName = file.filename;

    const query = `UPDATE candidate set resume_path = ? where id = ?`;
    db.query(query, [fileName, id], (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "An error occurred while retrieving user data." });
      }

      res
        .status(200)
        .json({ fileName: fileName, message: "File uploaded successfully" });
    });
  }
);

router.post("/delete-resume", verifyToken, (req, res, next) => {
  const { id } = req.user;

  const query = `UPDATE candidate SET resume_path = '' WHERE id = ?`;
  db.query(query, [id], (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "An error occurred while retrieving user data." });
    }

    res.status(200);
  });
});

router.post("/update-profile", verifyToken, (req, res, next) => {
  const { id } = req.user;
  const { first_name, last_name, email, phone, age, resume_path } = req.body;

  const query = `UPDATE candidate SET first_name = ?, last_name = ?, email = ?, phone = ?, age = ?, resume_path = ? WHERE id = ?`;
  db.query(
    query,
    [first_name, last_name, email, phone, age, resume_path, id],
    (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "An error occurred while retrieving user data." });
      }

      res.status(200);
    }
  );
});

module.exports = router;
