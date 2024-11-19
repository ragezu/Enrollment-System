import React from 'react';
import './Landingpage.css';
import { Link } from 'react-router-dom';

function Landingpage() {
  return (
    <>
      <div className="container">
  <div className="overlay">
    <div className="top-section">
      {/* Logos at the top */}
      <div className="logos">
        <div className="logo-shield"></div>
        <div className="logo-its"></div>
      </div>

      <div className="left-section">
        <div className="header">Truth. Excellence. Service</div>
        <div className="subheader">Department of Computer Studies Enrollment System</div>
        <div className="buttons">
          <Link to="/login"><button>Log In</button></Link>
          <Link to="/register"><button>Register</button></Link>
        </div>
      </div>
    </div>

    <div className="announcement">
      <h3>Announcement</h3>
      <p>
        <strong>Juan Dela Cruz</strong>
        <br />
        Sa mga students na late mag-enroll... Paano kayo maggrow niyan, hindi kayo naghihiwalay?
      </p>
      <Link to="/announcements">
        <button className="view-all-button">View All</button>
      </Link>
    </div>
  </div>
</div>


      <div className="container second-section">
        <div className="overlay">
          <div className="content"></div>
        </div>
      </div>
    </>
  );
}

export default Landingpage;
