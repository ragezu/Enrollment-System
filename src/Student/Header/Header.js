import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

function Header() {
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
        <Link to="/home">
          <a className={styles.navLink}>Home</a>
        </Link>
        <Link to="">
          <a className={styles.navLink}>Profile</a>
        </Link>
        <Link to="/submissionandsubject">
          <a className={styles.navLink}>Submission and Subject</a>
        </Link>
        <Link to="">
          <a className={styles.navLink}>Status and Scheduling</a>
        </Link>
        <Link to="">
          <a className={styles.navLink}>Log Out</a>
        </Link>
        <Link to="">
          <a className={styles.navLink}>
            <i class="fa-solid fa-bell"></i>
          </a>
        </Link>
      </nav>
    </div>
  );
}

export default Header;
