import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./EmailVerification.module.css";
import "../../App.css";

const OTPInput = ({ length = 6, onVerify }) => {  // Added onVerify prop
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  // Focus the first input field on initial render
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

      // Check OTP after all fields are filled
      if (newOtp.every((digit) => digit !== "")) {
        onVerify(newOtp.join(""));  // Pass entered OTP to parent
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
  const [isVerified, setIsVerified] = useState(false);  // State for verification status

  const handleVerify = (enteredOtp) => {
    if (enteredOtp === "492625") {  // Replace with actual verification logic
      setIsVerified(true);  // Show success message
    } else {
      alert("Invalid OTP. Please try again.");  // Handle incorrect OTP
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logos}>
          <Link to="/">
            <img
              src="./images/CSlogo.png"
              alt="BSCS Logo"
              className={styles.logo_shield}
            />
          </Link>
          <Link to="/">
            <img
              src="./images/ITlogo.png"
              alt="BSIT Logo"
              className={styles.logo_its}
            />
          </Link>
        </div>
        <div className={styles.header_texts}>
          <h3 className={styles.header_h3}>Department of Computer Studies</h3>
          <p className={styles.header_p}>
            Cavite State University - Bacoor City Campus
          </p>
        </div>
      </div>

      <div className={styles.content}>
        {!isVerified ? (  // Conditional rendering for OTP form and success message
          <div className={styles.content_wrapper}>
            <div className={styles.content_texts}>
              <h1 className={styles.content_h1}>Verify your email address</h1>
              <p className={styles.content_p}>
                We have sent a verification code to youremail@gmail.com. Please
                check your inbox and insert the code in the fields below to verify
                your email.
              </p>
            </div>
            <div className={styles.content_otp}>
              <OTPInput length={6} onVerify={handleVerify} />  {/* Pass verification handler */}
            </div>
            <a className={styles.continue_button}>Continue</a>
          </div>
        ) : (
          <div className={styles.successMessage}>
            <div className={styles.checkmark}></div>  {/* You can style this checkmark */}
            <h1 className={styles.content_h1}>REGISTRATION SUCCESSFUL!</h1>
            <p className={styles.content_p}>Your account has been successfully created. You may log in with the credentials you provided.</p>
            <Link to="/login" className={styles.continue_button}>Go to Login</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmailVerification;
