import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "../Register/Register.module.css";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal"; // Importing Modal library

Modal.setAppElement("#root"); // For accessibility reasons

const OTPInput = ({ length = 6, onVerify }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < length - 1) {
        inputRefs.current[index + 1].focus();
      }

      // Trigger verification once all OTP fields are filled
      if (newOtp.every((digit) => digit !== "")) {
        onVerify(newOtp.join(""));
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className={styles.otpContainer}>
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className={styles.otpInput}
        />
      ))}
    </div>
  );
};

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Track the current step
  const navigate = useNavigate();

  // Focus the first input field on component mount
  useEffect(() => {
    document.getElementById("email").focus(); // Focus on the first name input
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear the specific error when the user types
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {};

    // Email Validation
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password Validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    // Confirm Password Validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  };

  const [isVerified, setIsVerified] = useState(false); // State for verification status

  const handleVerify = async (enteredOtp) => {
    try {
      const response = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp: enteredOtp }),
      });

      const result = await response.json();
      if (response.ok) {
        if (result.message === "OTP verified successfully.") {
          setIsVerified(true); // Set verification state
          setTimeout(() => navigate("/login"), 2000); // Redirect after success
        } else {
          setErrors({
            otp: result.message || "Invalid OTP. Please try again.",
          });
        }
      } else {
        setErrors({ otp: result.message || "Verification failed." });
      }
    } catch (error) {
      console.error("Verification Error:", error);
      setErrors({ otp: "Error verifying OTP. Please try again later." });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to the server.");
    }
  };

  const renderErrorModal = () => {
    return (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Validation Errors"
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
      >
        <div className={styles.top_container}>
          <h1>Cannot proceed</h1>
          <button
            onClick={() => setIsModalOpen(false)}
            className={styles.closeModalBtn}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <ul>
          {Object.keys(errors).map((key) => (
            <li key={key}>{errors[key]}</li>
          ))}
        </ul>
      </Modal>
    );
  };

  const handleNextStep = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsModalOpen(true); // Open modal on error
      return;
    }

    // Proceed to the next step if validation passes
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className={styles.register_container}>
      <div className={styles.register_wrapper}>
        <div className={styles.logo}>
          <Link to="/">
            <img src="./images/bscslogo.jpg" alt="BSCS Logo" />
          </Link>
          <Link to="/">
            <img src="./images/bsitlogo.jpg" alt="BSIT Logo" />
          </Link>
          <div className={styles.heading}>
            <h3>Department of Computer Studies</h3>
            <p>Enrollment System</p>
          </div>
        </div>

        <h1>Create Account</h1>
        <form className={styles.responsive_form} onSubmit={handleSubmit}>
          {/* Second Step: User Account Form */}
          {currentStep === 1 && (
            <div className={`${styles.form} ${styles.user_account_form}`}>
              <div className={`${styles.form_row}`}>
                <div className={`${styles.form_field} ${styles.solo_row}`}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={styles.input}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className={styles.error}>{errors.email}</p>
                  )}
                </div>
              </div>

              <div className={`${styles.form_row}`}>
                <div className={`${styles.form_field} ${styles.solo_row}`}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className={styles.input}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className={styles.error}>{errors.email}</p>
                  )}
                </div>
              </div>

              <div className={`${styles.form_row}`}>
                <div className={`${styles.form_field} ${styles.solo_row}`}>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className={styles.input}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className={styles.error}>{errors.email}</p>
                  )}
                </div>
              </div>
              <div className={styles.navigation_button_holder}>
                <button
                  className={styles.register_btn}
                  type="button"
                  onClick={handleNextStep}
                >
                  Proceed
                </button>
              </div>
              <div className={styles.register_text_center}>
                <Link to="/login">
                  Already have an account? <span>Login</span>
                </Link>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className={styles.content}>
              {!isVerified ? (
                <div className={styles.content_wrapper}>
                  <h1 className={styles.content_h1}>
                    Verify your email address
                  </h1>
                  <p className={styles.content_p}>
                    We have sent a verification code to {formData.email}. Please
                    check your inbox and insert the code in the fields below to
                    verify your email.
                  </p>
                  {errors.otp && <p className={styles.error}>{errors.otp}</p>}{" "}
                  {/* Show error */}
                  <OTPInput length={6} onVerify={handleVerify} />
                </div>
              ) : (
                <div className={styles.successMessage}>
                  <h1 className={styles.content_h1}>
                    REGISTRATION SUCCESSFUL!
                  </h1>
                  <p className={styles.content_p}>
                    Your account has been successfully created. Redirecting to
                    login...
                  </p>
                </div>
              )}
            </div>
          )}
        </form>
        {renderErrorModal()}
      </div>
    </div>
  );
}
