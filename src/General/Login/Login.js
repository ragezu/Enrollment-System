import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Login/Login.module.css";
import '../../App.css'
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Login successful!");
        navigate()
        
      } else {
        setErrorMessage(result.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to connect to the server.");
    }
  };

  return (
    <div className={styles.login_container}>
    <div className={styles.wrapper}>
      
      <div className={styles.logo}>
        <Link to="/">
          <img src="./images/bscslogo.jpg" alt="BSCS Logo"
           style={{ display: "inline" }} />
        </Link>
        <Link to="/">
          <img src="./images/bsitlogo.jpg" alt="BSIT Logo"  style={{ display: "inline" }} />
        </Link>
        <div className={styles.heading}>
          <h3>
            Department of Computer Studies
          </h3>
          <p>
            Enrollment System
          </p>
        </div>
      </div>
      <h1>
        Log in
      </h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className={styles.form_field_login}>
            <label htmlFor="email">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.form_field_login}>
            <label htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              className={styles.input}
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.text_end}>
          <a href="#">Forgot password?</a>
        </div>
          <div className={styles.error_field}>
          {errorMessage && <p className={styles.error_message_login}>{errorMessage}</p>}
          </div>
          <button type="submit" className={styles.btn}>Login</button>
        </form>
        <div className={styles.text_center}>
          <p>
          Don't have an account? <Link to="/register"><span>Register</span></Link>
          </p> 
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
