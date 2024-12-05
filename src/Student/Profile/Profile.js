import React, { useState } from "react";
import styles from "./Profile.module.css";
import Header from "../Header/Header";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("personal"); // Default active tab
  const [profileImage, setProfileImage] = useState(null); // State to store uploaded image

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set the uploaded image
      };
      reader.readAsDataURL(file);
    }
  };

  // Render content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalDetails />;
      case "family":
        return <FamilyBackground />;
      case "education":
        return <Education />;
      case "account":
        return <AccountSettings />;
      default:
        return <PersonalDetails />;
    }
  };

  return (
    <div className={styles.profile_wrapper}>
      <div className={styles.profile_container}>
        {/* Left-side profile section */}
        <div className={styles.profile_sidebar}>
          <div className={styles.profile_photo}>
            {/* Display uploaded image or default placeholder */}
            <img
              src={profileImage || "profile-photo-placeholder.jpg"}
              alt="Profile"
              className={styles.uploaded_image}
            />
            <div className={styles.cameraIconWrapper}>
              <i className={`${styles.cameraIcon}  fa-solid fa-camera`}></i>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.file_input}
              />
            </div>
          </div>
          <div className={styles.profile_info}>
            <h3>Nathaniel Poole</h3>
            <p>Microsoft Inc.</p>
            <button className={styles.view_profile_btn}>
              View Public Profile
            </button>
          </div>
        </div>

        {/* Right-side tab content section */}
        <div className={styles.profile_content}>
          <div className={styles.tabs}>
            <a
              href="#personal"
              className={activeTab === "personal" ? styles.active : ""}
              onClick={(e) => {
                e.preventDefault(); // Prevent default anchor behavior
                setActiveTab("personal");
              }}
            >
              Personal Information
            </a>
            <a
              href="#family"
              className={activeTab === "family" ? styles.active : ""}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("family");
              }}
            >
              Family Background
            </a>
            <a
              href="#education"
              className={activeTab === "education" ? styles.active : ""}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("education");
              }}
            >
              Educational Attainment
            </a>
            <a
              href="#account"
              className={activeTab === "account" ? styles.active : ""}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("account");
              }}
            >
              Account Settings
            </a>
          </div>

          <div className={styles.tab_content}>{renderTabContent()}</div>
          
        </div>
      </div>
    </div>
  );
};

// Sample components for each tab
const PersonalDetails = () => (
  <div className={styles.info_wrapper}>Personal Information Content</div>
);

const FamilyBackground = () => <div>Family Background Content</div>;
const Education = () => <div>Educational Attainment Content</div>;
const AccountSettings = () => <div>Account Settings Content</div>;

export default Profile;
