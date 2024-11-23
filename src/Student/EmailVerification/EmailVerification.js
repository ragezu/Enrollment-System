import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./EmailVerification.module.css";
import "../../App.css";

const OTPInput = ({ length = 6 }) => {
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
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logos}>
          <Link to="/">
            <img src="./CSlogo.png" alt="BSCS Logo" />
          </Link>
          <Link to="/">
            <img src="./ITlogo.png" alt="BSIT Logo" />
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
            <OTPInput length={6} />
          </div>
          <a className={styles.continue_button}>Continue</a>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;
