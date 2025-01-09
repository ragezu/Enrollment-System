const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const bodyParser = require('body-parser');
const mysql = require("mysql2");
const app = express();
const crypto = require("crypto");
const nodemailer = require("nodemailer"); // Import Nodemailer
const session = require("express-session");
const cookieParser = require("cookie-parser");
const sessionStore = require('./sessionStore');

app.use(bodyParser.json());

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true,               // Allow cookies/session
  })
);
app.use(express.json());
app.use(cookieParser());
require('dotenv').config();
const sessionSecret = process.env.SESSION_SECRET;

// Set up session
app.use(
  session({
    secret: sessionSecret || "default_secret_key", // Use environment variable or fallback
    resave: false, // Remove duplicate
    saveUninitialized: false,
    store: sessionStore, // Ensure this is defined
    cookie: {
      secure: false, // Set true if using HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Database connection
const db = mysql.createConnection({
  host: "localhost", // Replace with your DB host
  user: "root", // Replace with your MySQL username
  password: "Wearefamily03", // Replace with your MySQL password
  database: "enrollment_system", // Replace with your DB name
});

// Promise-based connection
const dbPromise = db.promise();

// Route with callback-style connection
app.get('/callback-route', (req, res) => {
  db.query('SELECT * FROM tbl_user_account', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ message: 'Internal server error.' });
    }
    res.status(200).json(results);
  });
});

// Route with promise-based connection
app.post('/promise-route', async (req, res) => {
  try {
    const [rows] = await dbPromise.query('SELECT * FROM tbl_user_account WHERE email = ?', [req.body.email]);
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err.message);
  } else {
    console.log("Connected to database!");
  }
});

// wag buburahin
// Splitting Address
function splitAddress(address) {
  const addressParts = address.split(",").map((part) => part.trim());

  if (addressParts.length < 2) {
    throw new Error(
      "Invalid address format. Please provide house number, street. Use a "," to separate them."
    );
  }

  const house_number = addressParts[0];
  const street = addressParts[1];

  return { house_number, street};
}

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "martkaws847@gmail.com", // Replace with your Gmail
    pass: "hkol avhd afwa iawy",   // Replace with your Gmail App Password
  },
});

function generateOtp() {
  return crypto.randomInt(100000, 999999).toString();
}

app.get('/announcements', (req, res) => {
  // First, delete past announcements
  const deleteQuery = `DELETE FROM tbl_announcements WHERE date < NOW();`;

  db.query(deleteQuery, (deleteErr) => {
    if (deleteErr) {
      console.error('Error deleting old announcements:', deleteErr);
      return res.status(500).json({ error: 'Failed to delete old announcements' });
    }

    // Then, fetch the current announcements
    const selectQuery = `SELECT * FROM tbl_announcements ORDER BY date DESC;`;

    db.query(selectQuery, (selectErr, results) => {
      if (selectErr) {
        console.error('Error fetching announcements:', selectErr);
        return res.status(500).json({ error: 'Failed to fetch announcements' });
      }

      // Send the results as JSON
      res.json(results || []);
    });
  });
});

app.get('/latest-announcement', (req, res) => {
  const query = `SELECT * FROM tbl_announcements ORDER BY date DESC LIMIT 1;`;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json(err);
    console.log('Query Results:', results); // Log results for debugging
    res.json(results[0] || null);
  });
});

app.get('/enrolled-count', async (req, res) => {
  const queryTotal = `
    SELECT COUNT(*) AS totalEnrolled
    FROM tbl_student_data
    WHERE status = 'enrolled'
  `;

  const queryComSci = `
    SELECT COUNT(*) AS enrolledComSci
    FROM tbl_student_data
    WHERE status = 'enrolled' AND program = '1'
  `;

  const queryIT = `
    SELECT COUNT(*) AS enrolledIT
    FROM tbl_student_data
    WHERE status = 'enrolled' AND program = '2'
  `;

  const querypaidIT = `
    SELECT COUNT(*) AS paidIT
    FROM tbl_society_fee_transaction
    WHERE payment_status = 'paid' AND program = '1'
  `;

  const querypaidComSci = `
  SELECT COUNT(*) AS paidIT
  FROM tbl_society_fee_transaction
  WHERE payment_status = 'paid' AND program = '2'
`;

  try {
    const totalResult = await new Promise((resolve, reject) => {
      db.query(queryTotal, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    const comSciResult = await new Promise((resolve, reject) => {
      db.query(queryComSci, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    const itResult = await new Promise((resolve, reject) => {
      db.query(queryIT, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    const pcomSciResult = await new Promise((resolve, reject) => {
      db.query(querypaidComSci, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    const pitResult = await new Promise((resolve, reject) => {
      db.query(querypaidIT, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    const results = {
      totalEnrolled: totalResult[0]?.totalEnrolled || 0,
      enrolledComSci: comSciResult[0]?.enrolledComSci || 0,
      enrolledIT: itResult[0]?.enrolledIT || 0,
      paidIT: pitResult[0]?.paidIT || 0,
      paidComSci: pcomSciResult[0]?.paidComSci || 0,
    };

    res.json(results);
  } catch (error) {
    console.error('Error fetching enrollment counts:', error);
    res.status(500).json({ error: 'Failed to fetch enrollment counts' });
  }
});



// Endpoint to send OTP
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  // Generate a random 6-digit OTP
  const otp = crypto.randomInt(100000, 999999).toString();

  // Save the OTP and email temporarily in the database
  const otpQuery = `
    INSERT INTO tbl_email_verification (email, otp, expires_at)
    VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 15 MINUTE))
    ON DUPLICATE KEY UPDATE otp = ?, expires_at = DATE_ADD(NOW(), INTERVAL 15 MINUTE)
  `;

  db.query(otpQuery, [email, otp, otp], async (error) => {
    if (error) {
      console.error("Error saving OTP:", error.message);
      return res.status(500).json({ message: "Database error while saving OTP." });
    }

    // Send the OTP via email
    const mailOptions = {
      from: "Enrollment System <your_email@example.com>",
      to: email,
      subject: "Verify Your Email - OTP Code",
      text: `Your OTP is: ${otp}. It will expire in 15 minutes.`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "OTP sent successfully." });
    } catch (emailError) {
      console.error("Error sending OTP email:", emailError.message);
      res.status(500).json({ message: "Failed to send OTP email." });
    }
  });
});

// Endpoint to verify OTP
app.post("/verify-otp", async (req, res) => {
  const { email, password, otp } = req.body;

  console.log("Request Body:", req.body); // Log incoming request data

  if (!email || !password || !otp) {
    return res.status(400).json({
      success: false,
      message: "Email, password, and OTP are required.",
    });
  }

  const verifyQuery = `
    SELECT * FROM tbl_email_verification
    WHERE email = ? AND otp = ? AND expires_at > NOW()
  `;
  db.query(verifyQuery, [email, otp], async (error, results) => {
    if (error) {
      console.error("Database error:", error.message);
      return res.status(500).json({ success: false, message: "Database error." });
    }

    console.log("OTP Verification Results:", results);
    if (results.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP." });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const insertUserQuery = `
        INSERT INTO tbl_user_account (email, password)
        VALUES (?, ?)
      `;

      db.query(insertUserQuery, [email, hashedPassword], (userError) => {
        if (userError) {
          console.error("Error inserting user:", userError.message);
          if (userError.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
              success: false,
              message: "Email already registered.",
            });
          }
          return res.status(500).json({ success: false, message: "Error registering user." });
        }

        console.log("User inserted successfully");

        const updateQuery = `UPDATE tbl_email_verification SET otp_verified = 1 WHERE email = ?`;
        db.query(updateQuery, [email], (updateError) => {
          if (updateError) {
            console.error("Error updating OTP status:", updateError.message);
            return res.status(500).json({ success: false, message: "Database error while updating OTP status." });
          }

          console.log("OTP verification status updated successfully");
          res.status(200).json({ success: true, message: "OTP verified and registration successful." });
        });
      });
    } catch (hashError) {
      console.error("Error hashing password:", hashError.message);
      return res.status(500).json({ success: false, message: "Server error." });
    }
  });
});

app.post("/request-password-reset", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const [rows] = await dbPromise.query(
      "SELECT * FROM tbl_email_verification WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Email not found." });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    await dbPromise.query(
      `UPDATE tbl_email_verification 
       SET otp = ?, expires_at = DATE_ADD(NOW(), INTERVAL 15 MINUTE) 
       WHERE email = ?`,
      [otp, email]
    );

    await transporter.sendMail({
      from: "Enrollment System <your_email@example.com>",
      to: email,
      subject: "Password Reset Verification Code",
      text: `Your verification code is: ${otp}. It will expire in 15 minutes.`,
    });

    res.status(200).json({ message: "Verification code sent successfully." });
  } catch (error) {
    console.error("Error during password reset request:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.post("/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Validate the OTP
    const [result] = await dbPromise.query(
      `SELECT * FROM tbl_email_verification
       WHERE LOWER(email) = LOWER(?) AND otp = ? AND expires_at > NOW()`,
      [email, otp]
    );

    if (result.length === 0) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the users table
    const [updateResult] = await dbPromise.query(
      "UPDATE tbl_user_account SET password = ? WHERE LOWER(email) = LOWER(?)",
      [hashedPassword, email]
    );

    if (updateResult.affectedRows === 0) {
      return res.status(400).json({ message: "Failed to update the password. User not found." });
    }

    // Delete the OTP record to prevent reuse

    res.status(200).json({ message: "Password reset successful." });
  } catch (err) {
    console.error("Error resetting password:", err.message);
    res.status(500).json({ message: "Internal server error." });
  }
});




// Registration endpoint
app.post("/register", async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    dob,
    contactNumber,
    email,
    password,
    address,
    barangay,
    city,
    province,
    postal,
    country,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !dob ||
    !contactNumber ||
    !email ||
    !password ||
    !address ||
    !barangay ||
    !city ||
    !province ||
    !postal ||
    !country
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const { house_number, street } = splitAddress(address);
    const hashedPassword = await bcrypt.hash(password, 10);

    const addressQuery = `
      INSERT INTO tbl_address (house_number, street, barangay, city, province, country, postal_code)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      addressQuery,
      [house_number, street, barangay, city, province, country, postal],
      (addressError, addressResult) => {
        if (addressError) {
          console.error("Address insert error:", addressError.message);
          return res.status(500).json({
            message: "Database error while inserting address.",
          });
        }

        const addressId = addressResult.insertId;

        const userQuery = `
          INSERT INTO tbl_user_account (first_name, middle_name, last_name, date_of_birth, phone_number, email, password, address_id)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(
          userQuery,
          [
            firstName,
            middleName,
            lastName,
            dob,
            contactNumber,
            email,
            hashedPassword,
            addressId,
          ],
          (userError, userResult) => {
            if (userError) {
              console.error("User insert error:", userError.message);
              return res.status(500).json({
                message: "Database error while inserting user.",
              });
            }

            // Trigger frontend to navigate to email verification
            res.status(201).json({
              message: "Proceed to email verification.",
              userId: userResult.insertId, // Send user ID for verification if needed
              email: email, // Optional: Return the email for the frontend
            });
          }
        );
      }
    );
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ message: "Server error." });
  }
});

// Login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const query = `SELECT * FROM tbl_user_account WHERE email = ?`;

  db.query(query, [email], async (error, results) => {
    if (error) {
      console.error("Database error:", error.message);
      return res.status(500).json({ message: "Database error." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const isProfileComplete = user.first_name && user.last_name && user.date_of_birth && user.address_id;

    req.session.user = {
      user_id: user.user_id,
      email: user.email,
      account_role: user.account_role,
    };

    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err.message);
        return res.status(500).json({ message: "Session save failed." });
      }

      res.status(200).json({
        message: "Login successful.",
        role: user.account_role === 0 ? "student" : "admin",
        incompleteProfile: user.account_role === 0 && !isProfileComplete,
        user: { user_id: user.user_id },
      });
    });
  });
});

app.get("/check-session", (req, res) => {
  if (req.session && req.session.user) {
    console.log("Session User:", req.session.user); // Debugging
    return res.status(200).json({ message: "Session is valid.", user: req.session.user });
  }
  res.status(401).json({ message: "Session is invalid." });
});

// Endpoint to get user data if authenticated
app.get("/user/:userId", (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT * FROM tbl_user_account WHERE user_id = ?
  `;

  db.query(query, [userId], (error, results) => {
    if (error) {
      console.error("Error fetching user data:", error.message);
      return res.status(500).json({ message: "Database error." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(results[0]);
  });
});

// Logout endpoint
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err.message);
      return res.status(500).json({ message: "Failed to log out." });
    }

    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logout successful." });
  });
});

// Create a new student
app.post("/students", (req, res) => {
  const { firstName, lastName, email, phoneNumber } = req.body;

  if (!firstName || !lastName || !email || !phoneNumber) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const query = `
    INSERT INTO tbl_user_account (first_name, last_name, email, phone_number)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [firstName, lastName, email, phoneNumber], (err, results) => {
    if (err) {
      console.error("Error inserting student:", err.message);
      return res.status(500).json({ message: "Database error." });
    }

    res.status(201).json({ message: "Student added successfully!" });
  });
});

// Read all students
app.get("/students", (req, res) => {
  const query = "SELECT * FROM tbl_user_account";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching students:", err.message);
      return res.status(500).json({ message: "Database error." });
    }

    res.status(200).json(results);
  });
});

// Update a student
app.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phoneNumber } = req.body;

  if (!firstName || !lastName || !email || !phoneNumber) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const query = `
    UPDATE tbl_user_account
    SET first_name = ?, last_name = ?, email = ?, phone_number = ?
    WHERE user_id = ?
  `;

  db.query(query, [firstName, lastName, email, phoneNumber, id], (err, results) => {
    if (err) {
      console.error("Error updating student:", err.message);
      return res.status(500).json({ message: "Database error." });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json({ message: "Student updated successfully!" });
  });
});

// Delete a student
app.delete("/students/:id", (req, res) => {
  const { id } = req.params;

  const query = `
    DELETE FROM tbl_user_account WHERE user_id = ?
  `;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error deleting student:", err.message);
      return res.status(500).json({ message: "Database error." });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json({ message: "Student deleted successfully!" });
  });
});

// API Endpoint to post an announcement
app.post("/api/announcements", (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: "Unauthorized: No user session found." });
  }

  const { user_id } = req.session.user;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Announcement content is required." });
  }

  const query = `
    INSERT INTO tbl_announcements (author, content, date)
    VALUES (?, ?, NOW())
  `;

  // Combine first name and last name for the author
  const authorQuery = `
    SELECT CONCAT(last_name, ', ', first_name) AS author
    FROM tbl_user_account
    WHERE user_id = ?
  `;

  db.query(authorQuery, [user_id], (error, results) => {
    if (error) {
      console.error("Error fetching author details:", error.message);
      return res.status(500).json({ message: "Database error." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const author = results[0].author;

    db.query(query, [author, content], (err) => {
      if (err) {
        console.error("Error saving announcement:", err.message);
        return res.status(500).json({ message: "Failed to save announcement." });
      }

      res.status(200).json({ message: "Announcement posted successfully." });
    });
  });
});

app.get("/api/enrollees", async (req, res) => {
  try {
    const students = await db.query(`
      SELECT 
      tbl_student_data.student_id, 
      tbl_user_account.first_name, 
      tbl_user_account.last_name, 
      tbl_user_account.email,
      tbl_program.program_name,
      tbl_student_data.student_type,
      tbl_student_data.year_level
    FROM 
      tbl_student_data
    JOIN 
      tbl_user_account 
    ON 
      tbl_student_data.user_id = tbl_user_account.user_id
    JOIN 
      tbl_program 
    ON 
      tbl_student_data.program_id = tbl_program.program_id;
    `);
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).send("Server error");
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
