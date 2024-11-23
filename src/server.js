const cors = require("cors");
const express = require("express");
const bcrypt = require('bcryptjs');
const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const mysql = require("mysql2");

// Database connection
const connection = mysql.createConnection({
  host: "localhost",       // Replace with your database host
  user: "root",            // Replace with your MySQL username
  password: "Jerald_11783", // Replace with your MySQL password
  database: "enrollment_system" // Replace with your database name
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database!");
  }
});

// Registration endpoint
app.post("/register", async (req, res) => {
  const { firstName, middleName, lastName, dob, contactNumber, email, password } = req.body;

  if (!firstName || !lastName || !dob || !contactNumber || !email || !password) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO tbl_useraccount (first_name, middle_name, last_name, date_of_birth, phone_number, email, password)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
      query,
      [firstName, middleName, lastName, dob, contactNumber, email, hashedPassword],
      (error, results) => {
        if (error) {
          console.error("Database error:", error.message);
          res.status(500).json({ message: "Database error" });
        } else {
          res.status(200).json({ message: "User registered successfully!", id: results.insertId });
        }
      }
    );
  } catch (error) {
    console.error("Error hashing password:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Missing email or password" });
    return;
  }

  const query = `
    SELECT * FROM tbl_useraccount WHERE email = ?
  `;

  connection.query(query, [email], async (error, results) => {
    if (error) {
      console.error("Database error:", error.message);
      res.status(500).json({ message: "Database error" });
    } else if (results.length === 0) {
      res.status(404).json({ message: "Invalid email address" });
    } else {
      const user = results[0];

      // Compare hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        res.status(200).json({ message: "Login successful", user: { id: user.id, email: user.email } });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    }
  });
});

// Change the port here to 5000
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
