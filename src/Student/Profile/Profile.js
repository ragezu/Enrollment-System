import React, { useState } from "react";
import styles from "./Profile.module.css";

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
  <div className={styles.personal_details_wrapper}>
    <div className={styles.form_row}>
      <div className={styles.form_field}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          className={styles.input}
        />
      </div>

      <div className={styles.form_field}>
        <label htmlFor="middleName">Middle Name</label>
        <input
          type="text"
          name="middleName"
          id="middleName"
          className={styles.input}
        />
      </div>

      <div className={styles.form_field}>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          className={styles.input}
        />
      </div>
    </div>

    <div className={`${styles.form_row}`}>
      <div className={`${styles.form_field} ${styles.solo_row}`}>
        <label htmlFor="dob">Date of Birth</label>
        <input type="date" name="dob" id="dob" className={styles.input} />
      </div>
    </div>

    <div className={`${styles.form_row} ${styles.solo_row}`}>
      <div className={styles.form_field}>
        <label htmlFor="sex">Sex</label>
        <div className={styles.radio_container}>
          <div className={styles.radio}>
            <input type="radio" name="sex" id="Male" value="Male" />
            <label>Male</label>
          </div>
          <div className={styles.radio}>
            <input type="radio" name="sex" id="Female" value="Female" />
            <label>Female</label>
          </div>
        </div>
      </div>
    </div>

    <div className={`${styles.form_row}`}>
      <div className={`${styles.form_field} ${styles.two_rows}`}>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          id="address"
          className={styles.input}
          placeholder="Block 4 Lot 13, Madrigal Compound"
        />
      </div>

      <div className={`${styles.form_field} ${styles.two_rows}`}>
        <label htmlFor="street">Barangay</label>
        <input
          type="text"
          name="barangay"
          id="barangay"
          className={styles.input}
        />
      </div>
    </div>

    <div className={`${styles.form_row}`}>
      <div className={`${styles.form_field} ${styles.two_rows}`}>
        <label htmlFor="city">City</label>
        <input type="text" name="city" id="city" className={styles.input} />
      </div>

      <div className={`${styles.form_field} ${styles.two_rows}`}>
        <label htmlFor="province">Province</label>
        <input
          type="province"
          name="province"
          id="province"
          className={styles.input}
        />
      </div>
    </div>

    <div className={`${styles.form_row}`}>
      <div className={`${styles.form_field} ${styles.two_rows}`}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" name="postal" id="postal" className={styles.input} />
      </div>

      <div className={`${styles.form_field} ${styles.two_rows}`}>
        <label htmlFor="country">Country</label>
        <input
          type="text"
          name="country"
          id="country"
          className={styles.input}
        />
      </div>
    </div>

    <div className={`${styles.form_row}`}>
      <div className={`${styles.form_field} ${styles.solo_row}`}>
        <label htmlFor="contact">Contact Number</label>
        <input
          type="text"
          name="contactNumber"
          id="contact"
          className={styles.input}
        />
      </div>
    </div>

    <button className={styles.register_btn} type="submit">
      Next
    </button>
  </div>
);

const FamilyBackground = () => (
  <div className={styles.family_background_wrapper}>
    {/* Multipage Step 1 */}
    <div className={styles.family_background_step1}>
      <div className={styles.parent_container}>
        <div className={styles.title}>
          <h1>Parent 1</h1>
        </div>

        <div className={styles.field}>
          <label htmlFor="name">Name</label>
          <input type="text" className={styles.input} id="name" />
        </div>

        <div className={styles.field}>
          <label htmlFor="relationship">Relationship</label>
          <input type="text" className={styles.input} id="relationship" />
        </div>

        <div className={styles.field}>
          <label htmlFor="education">Highest Education</label>
          <select type="text" className={styles.input} id="education">
            <option disabled>Choose</option>
            <option>Choose</option>
            <option>Choose</option>
            <option>Choose</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="contact">Contact Number</label>
          <input type="text" className={styles.input} id="contact" />
        </div>
      </div>

      <div className={styles.parent_container}>
        <div className={styles.title}>
          <h1>Parent 2</h1>
        </div>
        <div className={styles.field}>
          <label htmlFor="name">Name</label>
          <input type="text" className={styles.input} id="name" />
        </div>

        <div className={styles.field}>
          <label htmlFor="relationship">Relationship</label>
          <input type="text" className={styles.input} id="relationship" />
        </div>

        <div className={styles.field}>
          <label htmlFor="education">Highest Education</label>
          <select type="text" className={styles.input} id="education">
            <option disabled>Choose</option>
            <option>Choose</option>
            <option>Choose</option>
            <option>Choose</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="contact">Contact Number</label>
          <input type="text" className={styles.input} id="contact" />
        </div>
      </div>
    </div>

    {/* Multipage Step 2 */}
    <div className={styles.family_background_step2}>
      <div className={styles.guardian}>
        <div className={styles.title}>
          <h1>Guardian</h1>
        </div>

        <div className={styles.row_field}>
          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <input type="text" className={styles.input} id="name" />
          </div>

          <div className={styles.field}>
            <label htmlFor="relationship">Relationship</label>
            <input type="text" className={styles.input} id="relationship" />
          </div>
        </div>

        <div className={styles.row_field}>
          <div className={styles.field}>
            <label htmlFor="employer">Employer</label>
            <input type="text" className={styles.input} id="employer" />
          </div>

          <div className={styles.field}>
            <label htmlFor="education">Highest Education</label>
            <select type="text" className={styles.input} id="education">
              <option disabled>Choose</option>
              <option>Choose</option>
              <option>Choose</option>
              <option>Choose</option>
            </select>
          </div>
        </div>

        <div className={styles.row_field}>
          <div className={styles.field}>
            <label htmlFor="contact">Contact Number</label>
            <input type="text" className={styles.input} id="contact" />
          </div>
        </div>
      </div>
    </div>

    {/* Multipage Step 3 */}

    <div className={styles.family_background_step3}>
      <div className={styles.siblings}>
        <div className={styles.title}>
          <h1>
            Siblings{" "}
            <span>
              If you are an only child, please leave it blank and proceed to the
              next step.
            </span>
          </h1>
        </div>

        <div className={styles.add_siblings_container}>
          <table className={styles.add_siblings_table}>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Age</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>

                <td>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    className={styles.add_siblings_name}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    name="age"
                    placeholder="Enter age"
                    className={styles.add_siblings_age}
                  />
                </td>

                <td>
                 
                    <div className={styles.candunits2}>
                      <button
                        type="button"
                        className={styles.add_subject_button}

                      >
                        Add
                      </button>
                    </div>
                    <button
                      type="button"
                      className={styles.remove_button}
                    >
                      <i className="fa-solid fa-x"></i>
                    </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

const Education = () => 
  <div className={styles.educational_attainment_wrapper}>
    <div className={styles.title}>
      <h1>Educational Attainment</h1>
    </div>

    <div className={styles.elementary}>
      <div className={styles.subtitle}>
        <h3>Elementary</h3>
      </div>
      <div className={styles.elementary_fields}>

        <div className={styles.last_school_attended}>
          <label htmlFor="elementary">Last School Attended</label>
          <input 
          type="text"
          id="elementary"
          name="elementary"
          />
        </div>
  
        <div className={styles.type_of_school}>
          <label htmlFor="type-of-school">
            Type of School
          </label>
          <select>
            <option disabled>Choose</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div className={styles.year_graduated}>
          <label htmlFor="year">Year Graduated</label>
          <input 
          type="number"
          id="year"
          name="year"
          />
        </div>

      </div>
    </div>

    <div className={styles.junior_hs}>
      <div className={styles.subtitle}>
        <h3>Junior High School</h3>
      </div>
      <div className={styles.junior_hs_fields}>

        <div className={styles.last_school_attended}>
          <label htmlFor="junior-hs">Last School Attended</label>
          <input 
          type="text"
          id="junior-hs"
          name="junior-hs"
          />
        </div>
  
        <div className={styles.type_of_school}>
          <label htmlFor="type-of-school">
            Type of School
          </label>
          <select>
            <option disabled>Choose</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div className={styles.year_graduated}>
          <label htmlFor="year">Year Graduated</label>
          <input 
          type="number"
          id="year"
          name="year"
          />
        </div>
        
      </div>
    </div>

    <div className={styles.senior_hs}>
      <div className={styles.subtitle}>
        <h3>Senior High School</h3>
      </div>
      <div className={styles.senior_hs_fields}>

        <div className={styles.last_school_attended}>
          <label htmlFor="senior-hs">Last School Attended</label>
          <input 
          type="text"
          id="senior-hs"
          name="senior-hs"
          />
        </div>
  
        <div className={styles.type_of_school}>
          <label htmlFor="type-of-school">
            Type of School
          </label>
          <select>
            <option disabled>Choose</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div className={styles.strand}>
          <label htmlFor="strand">Strand</label>
          <input 
          type="text"
          id="strand"
          name="strand"
          placeholder="Ex. STEM"
          />
        </div>

        <div className={styles.year_graduated}>
          <label htmlFor="year">Year Graduated</label>
          <input 
          type="number"
          id="year"
          name="year"
          />
        </div>
      </div>
    </div>
  </div>;


const AccountSettings = () => 
  <div className={styles.account_settings_wrapper}>
    <div className={styles.title}>
      <h1>Account Settings</h1>
    </div>
    <div className={styles.account}>
      <div className={styles.field}>
        <label htmlFor="email">
          Email
        </label>
        <input 
        type="email"
        name="email"
        id="email"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="password">
          Email
        </label>
        <input 
        type="password"
        name="password"
        id="password"
        />
      </div>
    </div>
  </div>;

export default Profile;
