import React from 'react';
import styles from '../Announcement/AnnouncementsPage.module.css';
import { Link } from "react-router-dom";

const announcements = [
  {
    id: 1,
    author: "Juan Dela Cruz",
    content: "Sa mga students na late mag-enroll... Paano kayo maggrow niyan, hindi kayo naghihiwalay?",
    date: "November 18, 2024 5:18 pm",
  },
  {
    id: 2,
    content: "FROM RECENT TO OLDER ANNOUNCEMENTS",
    date: "November 17, 2024 5:18 pm",
  },
  {
    id: 3,
    content: "FROM RECENT TO OLDER ANNOUNCEMENTS",
    date: "November 17, 2024 5:18 pm",
  },
  {
    id: 4,
    content: "FROM RECENT TO OLDER ANNOUNCEMENTS",
    date: "November 17, 2024 5:18 pm",
  },
  {
    id: 5,
    content: "FROM RECENT TO OLDER ANNOUNCEMENTS",
    date: "November 17, 2024 5:18 pm",
  },
  {
    id: 6,
    content: "FROM RECENT TO OLDER ANNOUNCEMENTS",
    date: "November 17, 2024 5:18 pm",
  },
  {
    id: 7,
    content: "FROM RECENT TO OLDER ANNOUNCEMENTS",
    date: "November 17, 2024 5:18 pm",
  },
  {
    id: 8,
    content: "FROM RECENT TO OLDER ANNOUNCEMENTS",
    date: "November 17, 2024 5:18 pm",
  },
  {
    id: 9,
    content: "FROM RECENT TO OLDER ANNOUNCEMENTS",
    date: "November 17, 2024 5:18 pm",
  },
  {
    id: 10,
    content: "FROM RECENT TO OLDER ANNOUNCEMENTS",
    date: "November 17, 2024 5:18 pm",
  },
  {
    id: 11,
    content: "FROM RECENT TO OLDER ANNOUNCEMENTS",
    date: "November 17, 2024 5:18 pm",
  },
  
];

const AnnouncementsPage = () => {
  return (
    <div className={styles.announcements_page}>
      <Link to="/"><div className={styles.back_button}> 
        <span>&larr;</span>
      </div></Link>
      <h1 className={styles.announcements_title}>Announcements</h1>
      <div className={styles.announcements_list}>
        {announcements.map((announcement) => (
          <div key={announcement.id} className={styles.announcement_card}>
            {announcement.author && (
              <p className={styles.announcement_author}>{announcement.author}</p>
            )}
            <p className={styles.announcement_content}>{announcement.content}</p>
            <p className={styles.announcement_date}>{announcement.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsPage;
