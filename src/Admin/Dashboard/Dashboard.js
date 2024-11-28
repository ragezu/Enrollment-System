import React from "react";
import DashboardHeader from "./DashboardHeader";
import styles from "./Dashboard.module.css";


const Dashboard = () => {
  return (
    <div className={styles.container}>
    <DashboardHeader />
    <div className={styles.dashboardHeader}>
    <h1>Dashboard</h1>
  </div>
  <div className={styles.dashboardContent}>
    <div className={styles.grid}>
          {/* Card 1: Enrolled Students */}
          <div className={`${styles.card} ${styles.enrolledStudents}`}>
  <h5 className={styles.cardTitle}>Enrolled Students</h5>
  <p><span>Total Enrolled</span> <strong>25</strong></p>
  <p><span>Total Enrolled Computer Science</span> <strong>25</strong></p>
  <p><span>Total Enrolled Information Technology</span> <strong>25</strong></p>
  <a href="#" className={styles.viewList}>View List</a>
</div>

          {/* Card 2: Regular and Irregular Students + Gender Distribution */}
          <div className={`${styles.card} ${styles.regularIrregularGender} ${styles.genderCard}`}>
          <p>Regular Student</p>
            <div className={styles.progressBar}>
              <div className={styles.progressBarGreen} style={{ width: "75%" }}>45</div>
              <div className={styles.progressBarRed} style={{ width: "25%" }}>15</div>
            </div>

            <p>Irregular Student</p>
            <div className={styles.progressBar}>
              <div className={styles.progressBarGreen} style={{ width: "50%" }}>45</div>
              <div className={styles.progressBarRed} style={{ width: "50%" }}>20</div>
            </div>

            <strong><h5 className={styles.cardTitle}>Gender</h5></strong>
            <p>Information Technology</p>
            <div className={styles.progressBar}>
              <div className={styles.progressBarBlue} style={{ width: "57%" }}>20</div>
              <div className={styles.progressBarPink} style={{ width: "43%" }}>15</div>
            </div>
            <p>Computer Science</p>
            <div className={styles.progressBar}>
              <div className={styles.progressBarBlue} style={{ width: "50%" }}>20</div>
              <div className={styles.progressBarPink} style={{ width: "50%" }}>20</div>
            </div>
          </div>

          {/* Card 3: Announcement */}
          <div className={`${styles.card} ${styles.announcementCard}`}>
            <h5 className={styles.cardTitle} >Announcement</h5>
            <textarea
              className={styles.announcementBox}
              placeholder="Make an announcement..."
            ></textarea>
            <button className={styles.announcementButton}>Send</button>
          </div>

          {/* Card 4: Total Paid (IT) */}
          <div className={`${styles.card} ${styles.totalPaid}`}>
            <h5 className={styles.cardTitle}>Total Paid (IT)</h5>
            <p className={`${styles.paidValue} ${styles.green}`}>23</p>
          </div>

          {/* Card 5: Total Paid (CS) */}
          <div className={`${styles.card} ${styles.totalPaidCS}`}>
            <h5 className={styles.cardTitle}>Total Paid (CS)</h5>
            <p className={`${styles.paidValue} ${styles.green}`}>23</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
