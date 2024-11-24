import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from '../Register/Register.module.css';
import '../../App.css';
import { useNavigate } from "react-router-dom";
import Modal from "react-modal"; // Importing Modal library

Modal.setAppElement('#root'); // For accessibility reasons

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    contactNumber: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({}); // State for validation errors
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
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
      newErrors.contactNumber = "Contact number must be between 7 and 15 digits.";
    }

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

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(); // Validate form fields
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set errors if any validation fails
      setIsModalOpen(true); // Open the modal when there are errors
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
        className={styles.modalContent} // Custom modal content styles
        overlayClassName={styles.modalOverlay} // Custom overlay styles
      >
        <div className={styles.top_container}>
        <h1>Cannot proceed</h1> 
        <button onClick={() => setIsModalOpen(false)} className={styles.closeModalBtn}>
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
          <div className={styles.form_row}>
            <div className={styles.form_field}>
              <label htmlFor="firstName">First Name<span className={styles.required_field}>*</span></label>
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
              <label htmlFor="lastName">Last Name<span className={styles.required_field}>*</span></label>
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

          <div className={styles.form_row}>
            <div className={styles.form_field}>
              <label htmlFor="email">Email<span className={styles.required_field}>*</span></label>
              <input
                type="email"
                name="email"
                id="email"
                className={styles.input}
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className={styles.form_field}>
              <label htmlFor="contactNumber">Contact Number<span className={styles.required_field}>*</span></label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                className={styles.input}
                placeholder="Ex. 09999999999"
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </div>

            <div className={styles.form_field}>
              <label htmlFor="dob">Date of Birth<span className={styles.required_field}>*</span></label>
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

          <div className={styles.form_row}>
            <div className={styles.form_field}>
              <label htmlFor="password">Password<span className={styles.required_field}>*</span> </label>
              <input
                type="password"
                name="password"
                id="password"
                className={styles.input}
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className={styles.form_field}>
              <button className={styles.register_btn} type="submit">
               Proceed
              </button>
            </div>
          </div>
        </form>
        <div className={styles.register_text_center}>
          <Link to="/login">Already have an account? <span>Login</span></Link>
        </div>
      </div>

      {/* Render Modal */}
      {renderErrorModal()}
    </div>
  );
}
