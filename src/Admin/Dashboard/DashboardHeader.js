import React from "react";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css"; // Import custom styles
import { FaBell } from "react-icons/fa"; // Font Awesome bell icon

const DashboardHeader = () => {
  const notificationCount = 5; // Replace with a dynamic value from backend

  return (
    <div className={styles.header}>
      {/* Logos */}
      <div className={styles.logos}>
        <Link to="/">
          <img
            src="./images/CSlogo.png"
            alt="BSCS Logo"
            className={styles.logo}
          />
        </Link>
        <Link to="/">
          <img
            src="./images/ITlogo.png"
            alt="BSIT Logo"
            className={`${styles.logo} ${styles.logoMargin}`}
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className={styles.navLinks}>
        <Link to="/dashboard" className={styles.navLink}>
          Dashboard
        </Link>
        <Link to="/enrollees" className={styles.navLink}>
          Enrollees
        </Link>
        <Link to="/students" className={styles.navLink}>
          Students
        </Link>
        <Link to="/team" className={styles.navLink}>
          Enrollment Team
        </Link>
        
        <Link to="/logout" className={`${styles.navLink} ${styles.logout}`}>
          Log Out
        </Link>
        <div className={styles.notificationWrapper}>
          <FaBell className={styles.notificationIcon} />
          {notificationCount > 0 && (
            <span className={styles.notificationBadge}>{notificationCount}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
