import React from 'react';
import styles from '../LandingPage/Landingpage.module.css';
import { Link } from 'react-router-dom';

function Landingpage() {
  return (
    <>
    <div className={styles.container}>
      <div className={styles.top_section}>
        <div className={styles.text_and_logo}>
          <div className={styles.landing_page_texts}>
            <h1 className={styles.header}>
              Truth. Excellence. Service
            </h1>
            <h2 className={styles.subheader}>
              Department of Computer Studies Enrollment System
            </h2>
            
          </div>
          <div className={styles.landing_page_buttons}>
                <Link to="/login"><button>Log In</button></Link>
                <Link to="/register"><button>Register</button></Link>
            </div>
        </div>
          
        <div className={styles.logos}>
          <div className={styles.logo_shield}></div>
          <div className={styles.logo_its}></div>
        </div>
      </div>

      <div className={styles.bottom_section}>
      <h3 className={styles.bottom_heading}>Announcement</h3>
      <div className={styles.announcement}>
        <h5>
          Juan Dela Cruz
        </h5>
        <p>
          Sa mga students na late mag-enroll... Paano kayo maggrow niyan, hindi kayo naghihiwalay?
        </p>
        <div className={styles.view_btn_holder}>
        <Link to="/announcements">
          <a className={styles.view_all_button}>View All</a>
        </Link>
        </div>
      </div>
      </div>
    </div>


      {/* Second Section */}
      {/*<div className="container second-section">
        <h2>Admissions</h2>
        <p>
          Students are categorized by the following:
        </p>
        <ul>
          <li><strong>Regular Students (S1):</strong> Those who are taking the regular load of subjects.</li>
          <li><strong>Incoming First-Year Students (S2):</strong> New students enrolling in the first year.</li>
          <li><strong>Irregular Students (S3):</strong> Those who are not taking the expected load of subjects based on their year level.</li>
          <li><strong>Shiftees (S4):</strong> Students who have shifted from other programs to IT/CS.</li>
          <li><strong>Returnees (S5):</strong> Students returning to continue their studies.</li>
          <li><strong>Transferees (S6):</strong> Students who have transferred from other universities.</li>
        </ul>
        
        <h3>Conditions for Classification:</h3>
        <p>
          The classification of student types is outlined as follows:
        </p>
        <ul>
          <li>A student who is a transferee and/or a regular student from other CvSU campuses shall be classified as <strong>S6</strong>.</li>
          <li>The classification of <strong>S4</strong> shall be applied exclusively to students residing in CvSU Bacoor who shift to the IT/CS program.</li>
          <li>A student shall be classified as <strong>S3</strong> only if they are residing on campus and are not enrolled in the regular workload of subjects.</li>
          <li>Students will be automatically classified as <strong>S3</strong> if their Certificate of Grades indicates a score of 4.00, 5.00, or contains the designations INC or DRP.</li>
          <li>Students that are planning to shift to other programs and/or transfer to other campuses shall not use this system.</li>
        </ul>

        <div className="requirements">
          <h3>Requirements</h3>
          <p>
            
          </p>
        </div>
      </div>*/}
    </>
  );
}

export default Landingpage;
