import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../utils/session"; // Import the logout function
import styles from "./Dashboard.module.css"; // Import custom styles

const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate); // Call the logout function and redirect to login
  };

  return (
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
      <nav className={styles.nav}>
        <Link to="/dashboard" className={styles.navLink}>
          Dashboard
        </Link>
        <Link to="/enrollee" className={styles.navLink}>
          Enrollees
        </Link>
        <a className={styles.navLink}>Students</a>
        <a className={styles.navLink}>Enrollment Team</a>
        <a
          className={styles.navLink}
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        >
          Log Out
        </a>
        <a className={styles.navLink}>
          <i className="fa-solid fa-bell"></i>
        </a>
      </nav>
    </div>
  );
};

export default DashboardHeader;
