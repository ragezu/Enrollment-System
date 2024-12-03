import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./EmailVerification.module.css";
import "../../App.css";

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

function EmailVerification() {
  const [email, setEmail] = useState(""); // New state for email input
  const [isVerified, setIsVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [passwordError, setPasswordError] = useState("");

  const handleEmailSubmit = () => {
    // Add logic to send OTP to the provided email address.
    // For now, proceed directly to the OTP verification step.
    if (email) {
      setStep(2); // Move to the next step (OTP verification)
    } else {
      alert("Please enter your email address.");
    }
  };

  const handleVerify = (enteredOtp) => {
    if (enteredOtp === "492625") {
      setIsVerified(true);
      setStep(3); // Move to the password change step
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handlePasswordChange = () => {
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    // Perform the password change logic here (e.g., update database)
    setStep(4); // Go to the success step
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logos}>
          <Link to="/">
            <img src="./images/CSlogo.png" alt="BSCS Logo" className={styles.logo_shield} />
          </Link>
          <Link to="/">
            <img src="./images/ITlogo.png" alt="BSIT Logo" className={styles.logo_its} />
          </Link>
        </div>
        <div className={styles.header_texts}>
          <h3 className={styles.header_h3}>Department of Computer Studies</h3>
          <p className={styles.header_p}>Cavite State University - Bacoor City Campus</p>
        </div>
      </div>

      <div className={styles.content}>
        {/* Step 1: Email Input */}
        {step === 1 && (
          <div className={styles.content_wrapper}>
            <div className={styles.content_texts}>
              <h1 className={styles.content_h1}>Forgot Password</h1>
              <p className={styles.content_p}>Enter your email address to receive a verification code.</p>
            </div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.emailInput}
            />
            <button onClick={handleEmailSubmit} className={styles.continue_button}>
              Send Verification Code
            </button>
          </div>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && !isVerified && (
          <div className={styles.content_wrapper}>
            <div className={styles.content_texts}>
              <h1 className={styles.content_h1}>Change Password</h1>
              <p className={styles.content_p}>
                We have sent a verification code to {email}. Please check your inbox and insert the code in the fields below to change your password.
              </p>
            </div>
            <div className={styles.content_otp}>
              <OTPInput length={6} onVerify={handleVerify} />
            </div>
          </div>
        )}

        {/* Step 3: Set New Password */}
        {step === 3 && isVerified && (
          <div className={styles.content_wrapper}>
            <div className={styles.content_texts}>
              <h1 className={styles.content_h1}>Set New Password</h1>
              <p className={styles.content_p}>Enter your new password and confirm it below.</p>
            </div>
            <label>New Password</label>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={styles.passwordInput}
            />

            <label>Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.passwordInput}
            />
            {passwordError && <p className={styles.errorMessage}>{passwordError}</p>}
            <button onClick={handlePasswordChange} className={styles.continue_button}>
              Change Password
            </button>
          </div>
        )}

        {/* Step 4: Success Message */}
        {step === 4 && isVerified && (
          <div className={styles.successMessage}>
            <div className={styles.checkmark}></div>
            <h1 className={styles.content_h1}>Password has been changed!</h1>
            <p className={styles.content_p}>Your password has successfully been changed. You may log in with the new password you created.</p>
            <Link to="/login" className={styles.continue_button}>
              Go to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmailVerification;