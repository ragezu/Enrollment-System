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
    resave: false,
    resave: false,
    saveUninitialized: false,
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
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      success: false,
      message: "Email and OTP are required.",
    });
  }

  const verifyQuery = `
    SELECT * FROM tbl_email_verification
    WHERE email = ? AND otp = ? AND expires_at > NOW()
  `;

  db.query(verifyQuery, [email, otp], (error, results) => {
    if (error) {
      console.error("Database error:", error.message);
      return res.status(500).json({
        success: false,
        message: "Database error.",
      });
    }

    if (results.length === 0) {
      // If OTP verification fails, delete user and address
      const getUserQuery = `
        SELECT id, address_id FROM tbl_user_account WHERE email = ?
      `;

      db.query(getUserQuery, [email], (getUserError, userResults) => {
        if (getUserError) {
          console.error("Error fetching user data:", getUserError.message);
          return res.status(500).json({
            success: false,
            message: "Database error while fetching user data.",
          });
        }

        if (userResults.length > 0) {
          const { id: userId, address_id: addressId } = userResults[0];

          // Delete user account
          const deleteUserQuery = `DELETE FROM tbl_user_account WHERE id = ?`;
          db.query(deleteUserQuery, [userId], (deleteUserError) => {
            if (deleteUserError) {
              console.error("Error deleting user:", deleteUserError.message);
              return res.status(500).json({
                success: false,
                message: "Error deleting user account.",
              });
            }

            // Delete address
            const deleteAddressQuery = `DELETE FROM tbl_address WHERE id = ?`;
            db.query(deleteAddressQuery, [addressId], (deleteAddressError) => {
              if (deleteAddressError) {
                console.error("Error deleting address:", deleteAddressError.message);
                return res.status(500).json({
                  success: false,
                  message: "Error deleting address.",
                });
              }

              return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP. User data has been removed.",
              });
            });
          });
        } else {
          return res.status(400).json({
            success: false,
            message: "Invalid or expired OTP. No user data found to delete.",
          });
        }
      });
    } else {
      // If OTP verification succeeds
      const updateQuery = `
        UPDATE tbl_email_verification
        SET otp_verified = 1
        WHERE email = ?
      `;

      db.query(updateQuery, [email], (updateError) => {
        if (updateError) {
          console.error("Error updating OTP verification status:", updateError.message);
          return res.status(500).json({
            success: false,
            message: "Database error while updating OTP status.",
          });
        }

        res.status(200).json({
          success: true,
          message: "OTP verified successfully.",
        });
      });
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

    // Save user data in session
    req.session.user = {
      user_id: user.user_id,
      email: user.email,
      account_role: user.account_role,
    };

    // Save the session explicitly
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err.message);
        return res.status(500).json({ message: "Session save failed." });
      }

      res.status(200).json({
        message: "Login successful.",
        role: user.account_role === 0 ? "student" : "admin",
        user,
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


// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
