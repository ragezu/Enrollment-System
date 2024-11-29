const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2");
const app = express();
const crypto = require("crypto");
const nodemailer = require("nodemailer"); // Import Nodemailer

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost", // Replace with your DB host
  user: "root", // Replace with your MySQL username
  password: "Jerald_11783", // Replace with your MySQL password
  database: "enrollment_system", // Replace with your DB name
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
    return res.status(400).json({ message: "Email and OTP are required." });
  }

  const verifyQuery = `
    SELECT * FROM tbl_email_verification
    WHERE email = ? AND otp = ? AND expires_at > NOW()
  `;

  db.query(verifyQuery, [email, otp], (error, results) => {
    if (error) {
      console.error("Database error:", error.message);
      return res.status(500).json({ message: "Database error." });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    // Mark OTP as verified
    const updateQuery = `
      UPDATE tbl_email_verification
      SET otp_verified = 1
      WHERE email = ?
    `;

    db.query(updateQuery, [email], (updateError) => {
      if (updateError) {
        console.error("Error updating OTP verification status:", updateError.message);
        return res.status(500).json({ message: "Database error while updating OTP status." });
      }

      res.status(200).json({ message: "OTP verified successfully." })
    });
  });
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

  // Ensure email is verified and OTP is marked as used
  const checkEmailQuery = `
    SELECT * FROM tbl_email_verification
    WHERE email = ? AND otp_verified = 1 AND expires_at > NOW()
  `;

  db.query(checkEmailQuery, [email], async (error, results) => {
    if (error) {
      console.error("Database error:", error.message);
      return res.status(500).json({ message: "Database error." });
    }

    if (results.length === 0) {
      return res
        .status(400)
        .json({ message: "Email not verified. Please verify your email first." });
    }

    try {
      // Proceed with registration after OTP verification
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
            return res
              .status(500)
              .json({ message: "Database error while inserting address." });
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
                return res
                  .status(500)
                  .json({ message: "Database error while inserting user." });
              }

              res.status(201).json({
                message: "Registration successful!",
                userId: userResult.insertId,
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
});

// Login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const query = `
    SELECT * FROM tbl_user_account WHERE email = ?
  `;

  db.query(query, [email], async (error, results) => {
    if (error) {
      console.error("Database error:", error.message);
      return res.status(500).json({ message: "Database error." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const user = results[0];

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    res.status(200).json({
      message: "Login successful.",
      user: { id: user.id, email: user.email },
    });
  });
});


// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
