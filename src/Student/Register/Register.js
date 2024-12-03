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
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    contactNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    sex: "",
    address: "",
    barangay: "", // Added field
    city: "",
    province: "",
    postal: "",
    country: "",
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Track the current step
  const navigate = useNavigate();
 

  // Focus the first input field on component mount
  useEffect(() => {
    document.getElementById("firstName").focus(); // Focus on the first name input
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {};

    // First Name Validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    // Last Name Validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    // Date of Birth Validation
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required.";
    }

    // Contact Number Validation
    if (!formData.contactNumber) {
      newErrors.contactNumber = "Contact number is required.";
    } else if (!/^\d{7,15}$/.test(formData.contactNumber)) {
      newErrors.contactNumber =
        "Contact number must be between 7 and 15 digits.";
    }

    // Email Validation
    if (currentStep === 2) {
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
    }

    return newErrors;
  };


  const [isVerified, setIsVerified] = useState(false);  // State for verification status

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
          setErrors({ otp: result.message || "Invalid OTP. Please try again." });
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
      return;
    }
  
    if (currentStep === 2) {
      try {
        // Send OTP to user's email when moving to Step 3
        const response = await fetch("http://localhost:5000/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        });
  
        if (response.ok) {
          setIsOtpSent(true);
          setCurrentStep((prev) => prev + 1);  // Proceed to Step 3
        } else {
          alert("Failed to send OTP. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to connect to the server.");
      }
    } else {
      setCurrentStep((prev) => prev + 1);  // Otherwise, just move to next step
    }
  };
  
  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
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

        <h1>Registration Form</h1>
        <form className={styles.responsive_form} onSubmit={handleSubmit}>
          {/* First Step: Credential Form */}
          {currentStep === 1 && (
            <div className={`${styles.form} ${styles.credentails_form}`}>
              <div className={styles.form_row}>
                <div className={styles.form_field}>
                  <label htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className={styles.input}
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.form_field}>
                  <label htmlFor="middleName">
                    Middle Name
                    </label>
                  <input
                    type="text"
                    name="middleName"
                    id="middleName"
                    className={styles.input}
                    value={formData.middleName}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.form_field}>
                  <label htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className={styles.input}
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={`${styles.form_row}`}>
                <div className={`${styles.form_field} ${styles.solo_row}`}>
                  <label htmlFor="dob">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    className={styles.input}
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={`${styles.form_row} ${styles.solo_row}`}>
                <div className={styles.form_field}>
                  <label htmlFor="sex">
                    Sex
                  </label>
                  <div className={styles.radio_container}>
                    <div className={styles.radio}>
                      <input type="radio" name="sex" id="Male" value="Male" />
                      <label>Male</label>
                    </div>
                    <div className={styles.radio}>
                      <input
                        type="radio"
                        name="sex"
                        id="Female"
                        value="Female"
                      />
                      <label>Female</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${styles.form_row}`}>
                <div className={`${styles.form_field} ${styles.two_rows}`}>
                  <label htmlFor="address">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className={styles.input}
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Block 4 Lot 13, Madrigal Compound"
                  />
                </div>


               <div className={`${styles.form_field} ${styles.two_rows}`}>
                  <label htmlFor="street">
                    Barangay
                  </label>
                  <input
                    type="text"
                    name="barangay"
                    id="barangay"
                    className={styles.input}
                    value={formData.barangay}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <div className={`${styles.form_row}`}>
                <div className={`${styles.form_field} ${styles.two_rows}`}>
                  <label htmlFor="city">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    className={styles.input}
                    onChange={handleChange}
                    value={formData.city}
                  />
                </div>

                <div className={`${styles.form_field} ${styles.two_rows}`}>
                  <label htmlFor="province">
                    Province
                  </label>
                  <input
                    type="province"
                    name="province"
                    id="province"
                    className={styles.input}
                    onChange={handleChange}
                    value={formData.province}
                  />
                </div>
              </div>

              <div className={`${styles.form_row}`}>
                <div className={`${styles.form_field} ${styles.two_rows}`}>
                  <label htmlFor="postal">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postal"
                    id="postal"
                    className={styles.input}
                    onChange={handleChange}
                    value={formData.postal}
                  />
                </div>

                <div className={`${styles.form_field} ${styles.two_rows}`}>
                  <label htmlFor="country">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    className={styles.input}
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={`${styles.form_row}`}>
                <div className={`${styles.form_field} ${styles.solo_row}`}>
                  <label htmlFor="contact">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    name="contactNumber"
                    id="contact"
                    className={styles.input}
                    value={formData.contactNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                className={styles.register_btn}
                type="submit"
                onClick={handleNextStep}
              >
                Next
              </button>
              <div className={styles.register_text_center}>
                <Link to="/login">
                  Already have an account? <span>Login</span>
                </Link>
              </div>
            </div>
          )}

          {/* Second Step: User Account Form */}
          {currentStep === 2 && (
            <div className={`${styles.form} ${styles.user_account_form}`}>
              <div className={`${styles.form_row}`}>
                <div className={`${styles.form_field} ${styles.solo_row}`}>
                  <label htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={styles.input}
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={`${styles.form_row}`}>
                <div className={`${styles.form_field} ${styles.solo_row}`}>
                  <label htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className={styles.input}
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={`${styles.form_row}`}>
                <div className={`${styles.form_field} ${styles.solo_row}`}>
                  <label htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className={styles.input}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
                <div className={styles.navigation_button_holder}>
                <button
                  className={`${styles.register_btn} ${styles.register_back_btn}`}
                  type="button"
                  onClick={handlePreviousStep}
                >
                  Back
                </button>
                <button
                className={styles.register_btn}
                type="submit"
                onClick={handleNextStep}
              >
                Next
              </button>
                </div>
            </div>
          )}



{currentStep === 3 && (
  <div className={styles.content}>
    {!isVerified ? (
      <div className={styles.content_wrapper}>
        <h1 className={styles.content_h1}>Verify your email address</h1>
        <p className={styles.content_p}>
          We have sent a verification code to {formData.email}. Please check your inbox and insert the code in the fields below to verify your email.
        </p>
        {errors.otp && <p className={styles.error}>{errors.otp}</p>} {/* Show error */}
        <OTPInput length={6} onVerify={handleVerify} />
      </div>
    ) : (
      <div className={styles.successMessage}>
        <h1 className={styles.content_h1}>REGISTRATION SUCCESSFUL!</h1>
        <p className={styles.content_p}>
          Your account has been successfully created. Redirecting to login...
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
