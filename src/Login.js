// src/Login.js
import React from 'react';
import { Link } from "react-router-dom";

import './style.css';
const Login = () => {
    return (
        <div className="wrapper">
            <div className="logo">
            <Link to="/">  <img src="./images/bscslogo.jpg" alt="BSCS Logo" style={{ display: 'inline' }} /> </Link>
            <Link to="/">   <img src="./images/bsitlogo.jpg" alt="BSIT Logo" style={{ display: 'inline' }} /> </Link>
            </div>
            <div>
                <div className="text-center mt-4 name">
                    Department of Computer Studies
                </div>
                <form className="p-3 mt-3">
                    <div className="form-field d-flex align-items-center">
                        <span className="far fa-user"></span>
                        <input type="text" name="email" id="email" placeholder="Email" />
                    </div>
                    <div className="form-field d-flex align-items-center">
                        <span className="fas fa-key"></span>
                        <input type="password" name="password" id="pwd" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn mt-3">Login</button>
                </form>
                <div className="text-center fs-6">
                    <a href="#">Forgot password?</a> or  <Link to="/register">Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
