import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../Register/Register.module.css";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal"; // Importing Modal library

Modal.setAppElement("#root"); // For accessibility reasons

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    contactNumber: "",
    email: "",
    password: "",
    confirmPassword: "", // Added for confirmPassword field
    sex: "",
    address: "",
    city: "",
    province: "",
    postal: "",
    country: "",
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsModalOpen(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert(result.message || "Failed to register.");
      }
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

  const handleNextStep = () => {
    const validationErrors = validate();

    // If there are errors, show the modal and do not move to the next step
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsModalOpen(true);
      return;
    }

    // If no errors, proceed to the next step
    setCurrentStep((prevStep) => prevStep + 1);
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
                    First Name<span className={styles.required_field}>*</span>
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
                  <label htmlFor="middleName">Middle Name</label>
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
                    Last Name<span className={styles.required_field}>*</span>
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
                    <span className={styles.required_field}>*</span>
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
                    <span className={styles.required_field}>*</span>
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
                <div className={`${styles.form_field} ${styles.solo_row}`}>
                  <label htmlFor="address">
                    Address<span className={styles.required_field}>*</span>{" "}
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className={styles.input}
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={`${styles.form_row}`}>
                <div className={`${styles.form_field} ${styles.two_rows}`}>
                  <label htmlFor="city">
                    City
                    <span className={styles.required_field}>*</span>
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
                    <span className={styles.required_field}>*</span>
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
                    <span className={styles.required_field}>*</span>
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
                    <span className={styles.required_field}>*</span>
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
                    <span className={styles.required_field}>*</span>{" "}
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
                    Email<span className={styles.required_field}>*</span>
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
                    Password<span className={styles.required_field}>*</span>
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
                    <span className={styles.required_field}>*</span>
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
                <button
                  className={`${styles.register_btn} ${styles.register_back_btn}`}
                  type="button"
                  onClick={handlePreviousStep}
                >
                  Back
                </button>
                <button className={`${styles.register_btn} ${styles.register_submit_btn}`} type="submit">
                  Submit
                </button>
            </div>
          )}
        </form>

        {renderErrorModal()}
      </div>
    </div>
  );
}
