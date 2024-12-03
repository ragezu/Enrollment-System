import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import styles from "../Login/Login.module.css";
import "../../App.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const emailInputRef = useRef(null);

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
        credentials: "include", // Include cookies/session
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // Navigate based on role
        if (result.role === "student") {
          navigate("/home", { state: { userId: result.user.user_id } });
        } else if (result.role === "admin") {
          navigate("/dashboard", { state: { userId: result.user.user_id } });
        } else {
          throw new Error("Unexpected role received.");
        }
  
        // Only show success toast after successful navigation
        toast.success("Login successful!");
      } else {
        // Display backend error message
        throw new Error(result.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      toast.error(error.message || "Failed to connect to server.");
    }
  };

  // Focus the email input field when the component mounts
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  return (
    
    <div className={styles.login_container}>
      <ToastContainer
        position="top-center"  // Positions toasts at the center top
        autoClose={3000}       // Closes the toast automatically after 3 seconds
        hideProgressBar={true} // Hides the progress bar
        newestOnTop={false}     // Ensures new toasts stack on top
        closeOnClick           // Allows toast to close when clicked
        pauseOnFocusLoss       // Pauses timer when window loses focus
        draggable              // Enables drag to dismiss
        pauseOnHover           // Pauses timer when hovered over
      />
 {/* Toast Container */}
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Link to="/">
            <img
              src="./images/bscslogo.jpg"
              alt="BSCS Logo"
              style={{ display: "inline" }}
            />
          </Link>
          <Link to="/">
            <img
              src="./images/bsitlogo.jpg"
              alt="BSIT Logo"
              style={{ display: "inline" }}
            />
          </Link>
          <div className={styles.heading}>
            <h3>Department of Computer Studies</h3>
            <p>Enrollment System</p>
          </div>
        </div>
        <h1>Log in</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.form_field_login}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
              required
              ref={emailInputRef}
            />
          </div>
          <div className={styles.form_field_login}>
            <label htmlFor="password">Password</label>
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
            <Link to="/EmailVerification">
            <a href="#">Forgot password?</a>
            </Link>
          </div>
          <div className={styles.button_holder}>
            <button type="submit" className={styles.btn}>
              Login
            </button>
          </div>
        </form>
        <div className={styles.text_center}>
          <p>
            Don't have an account?{" "}
            <Link to="/register">
              <span>Register</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
