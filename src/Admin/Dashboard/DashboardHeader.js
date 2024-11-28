import React from "react";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css"; // Import custom styles

const DashboardHeader = () => {
  const notificationCount = 5; // Replace with a dynamic value from backend

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
          <a className={styles.navLink}>Dashboard</a>
          <a className={styles.navLink}>Enrollees</a>
          <a className={styles.navLink}>Students</a>
          <a className={styles.navLink}>Enrollment Team</a>
          <a className={styles.navLink}>Log Out</a>
          <a className={styles.navLink}>
            <i class="fa-solid fa-bell"></i>
          </a>
        </nav>
    </div>
  );
};

export default DashboardHeader;
