import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { checkSession, logout } from "../../utils/session";
import styles from "./Home.module.css";
import Header from "../Header/Header";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const initialize = async () => {
      const isValidSession = await checkSession(navigate); // Check session validity
      if (isValidSession && userId) {
        await fetchUserData(); // Fetch user data if session is valid and userId exists
      } else {
        console.error("Invalid session or missing userId.");
        navigate("/login"); // Redirect if session is invalid
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user/${userId}`, {
          credentials: "include", // Ensure cookies are included
        });
    
        if (response.ok) {
          const data = await response.json();
          setUserData(data); // Set the state with the retrieved user data
        } else {
          const error = await response.json();
          console.error("Error:", error.message);
          throw new Error(error.message || "Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        setUserData(null); // Set state to null in case of error
      } finally {
        setIsLoading(false); // Stop the loading spinner
      }
    };

    initialize(); // Initialize component state and session check
  }, [userId, navigate]);

  const handleLogout = () => {
    logout(navigate); // Log out the user and redirect to login
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show loading screen while fetching user data
  }

  if (!userData) {
    return <div>Error loading user data. Please try again.</div>; // Error message if no user data
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <Header />
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
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
