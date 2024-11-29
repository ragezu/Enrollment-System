import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import axios from "axios";
import styles from "./Home.module.css";
import Header from "../Header/Header";
// import { useNavigate } from "react-router-dom";


const Home = () => {
  const location = useLocation();
  const userId = location.state?.userId; // Get userId from location state

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/user/${userId}`);
          const data = await response.json();

          if (data && data.first_name) {
            setUserData(data);
          } else {
            console.error('No data or first_name missing.');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [userId]); // Run this effect only when userId changes

  if (!userData) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <Header />
      </header>
      <h1 className={styles.title}>Home</h1>
      <main className={styles.content}>
        <div className={styles.profileCard}>
          <div className={styles.avatar}></div>
          <strong className={styles.infoName}>Name</strong>
          <p className={`${styles.info} ${styles.marginBelow}`}>
          {userData.last_name}, {userData.first_name} {userData.middle_name} 
          </p>
          <strong className={styles.infoName}>Student Number</strong>
          <p className={`${styles.info} ${styles.marginBelow}`}>N/A</p>
          <strong className={styles.info}>Program</strong>
          <p className={`${styles.info} ${styles.marginBelow}`}>N/A</p>
          <strong className={styles.info}>Year Level</strong>
          <p className={`${styles.info} ${styles.marginBelow}`}>N/A</p>
          <button className={styles.view_button}>View Details</button>
        </div>

        <div className={styles.content_right}>
          <div className={styles.statusCard}>
            <div className={styles.statusGroup}>
              <h3 className={styles.boldHeader}>Enrollment Status</h3>
              <h1 className={styles.enrollmentStatus}>Not Enrolled</h1>
              <p className={styles.statusInfo}>No Enrollment Schedule Date</p>
            </div>
            <div className={styles.buttonGroup}>
              <button className={styles.printButton}>Print COR</button>
              <button className={styles.printButton}>Print COE</button>
            </div>
          </div>

          <div className={styles.announcementCard}>
            <h3 className={styles.announcementTitle}>Announcements</h3>
            <div className={styles.announcementContainer}>
              <h4>Society President</h4>
              <p className={styles.announcementContent}>
                Sa mga students na late mag-enroll... Paano kayo maggrow niyan,
                hindi kayo naghihiwalay.
              </p>
              <div className={styles.viewAllButtonContainer}>
                <button className={styles.viewAllButton}>VIEW ALL</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
