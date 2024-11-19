import React from "react";
import { Link } from "react-router-dom";
export default function  Register() {
  return(
    <div className="wrapper">
  <div className="logo">
  <Link to="/">  <img src="images/bscslogo.jpg" style={{display: 'inline'}} /> </Link> 
  <Link to="/">  <img src="images/bsitlogo.jpg" style={{display: 'inline'}} /> </Link> 
  </div>
  <div className="text-center mt-4 name">
    Registration Form
  </div>
  <form className="p-3 mt-3">
    <div className="form-field d-flex align-items-center">
      <span className="fas fa-user" />
      <input type="text" name="firstName" id="firstName" placeholder="First Name" required />
    </div>
    <div className="form-field d-flex align-items-center">
      <span className="fas fa-user" />
      <input type="text" name="middleName" id="middleName" placeholder="Middle Name" />
    </div>
    <div className="form-field d-flex align-items-center">
      <span className="fas fa-user" />
      <input type="text" name="lastName" id="lastName" placeholder="Last Name" required />
    </div>
    <div className="form-field d-flex align-items-center">
      <span className="fas fa-calendar-alt" />
      <input type="date" name="dob" id="dob" placeholder="Date of Birth" required />
    </div>
    <div className="form-field d-flex align-items-center">
      <span className="fas fa-phone" />
      <input type="tel" name="contactNumber" id="contactNumber" placeholder="Contact Number" required />
    </div>
    <div className="form-field d-flex align-items-center">
      <span className="fas fa-envelope" />
      <input type="email" name="email" id="email" placeholder="Email Address" required />
    </div>
    <button className="btn mt-3">Register</button>
  </form>
  <div className="text-center fs-6">
    <Link to="/login">Already have an account? Login</Link>
  </div>
</div>

  )
}
