import React, { useEffect, useState } from 'react';
import styles from '../LandingPage/Landingpage.module.css';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';


function Landingpage() {
  const [latestAnnouncement, setLatestAnnouncement] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/latest-announcement')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Announcement:', data); // Log for debugging
        setLatestAnnouncement(data);
      })
      .catch(error => console.error('Error fetching the latest announcement:', error));
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.top_section}>
          <div className={styles.text_and_logo}>
            <div className={styles.landing_page_texts}>
              <h1 className={styles.header}>Truth. Excellence. Service</h1>
              <h2 className={styles.subheader}>
                Department of Computer Studies Enrollment System
              </h2>
            </div>
            <div className={styles.landing_page_buttons}>
              <Link to="/login">
                <button>Log In</button>
              </Link>
              <Link to="/register">
                <button>Register</button>
              </Link>
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
            {latestAnnouncement ? (
              <>
                <h5>{latestAnnouncement.author || 'Unknown Author'}</h5>
                <p>{latestAnnouncement.content}</p>
                <p>{format(new Date(latestAnnouncement.date), 'MMMM d, yyyy @ h:mm a')}</p>
              </>
            ) : (
              <p>No recent announcements available.</p>
            )}
            <div className={styles.view_btn_holder}>
              <Link to="/announcements">
                <a className={styles.view_all_button}>View All</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landingpage;
