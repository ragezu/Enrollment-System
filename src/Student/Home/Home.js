import React from "react";
import styles from "./Home.module.css";
import Header from "../Header/Header";

const Home = () => {
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <Header />
      </header>
      <h1 className={styles.title}>Home</h1>
      <main className={styles.content}>
        <div className={styles.profileCard}>
          <div className={styles.avatar}>
          </div>
          <strong className={styles.infoName}>Name</strong>
          <p className={`${styles.info} ${styles.marginBelow}`}>N/A</p>
          <strong className={styles.infoName}>Student Number</strong>
          <p className={`${styles.info} ${styles.marginBelow}`}>N/A</p>
          <strong className={styles.info}>Program</strong>
          <p className={`${styles.info} ${styles.marginBelow}`}>
            N/A
          </p>
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
