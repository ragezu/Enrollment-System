
import styles from './Enrolees.module.css'
import React, { useState } from "react";


const Enrollees = () => {
  const [students, setStudents] = useState([
    {
      id: "20231001",
      lastName: "Labalan",
      firstName: "Jerald",
      middleName: "Sikip",
      type: "S6",
      yearStanding: "3rd year",
      details: "Detailed information about Jerald Labalan"
    },
    {
      id: "20231001",
      lastName: "Fernandez",
      firstName: "Alex",
      middleName: "tingenhawak",
      type: "S6",
      yearStanding: "3rd year",
      details: "Detailed information about Jerald Labalan"
    },
    {
      id: "20231001",
      lastName: "Galvez",
      firstName: "Dioren",
      middleName: "Golem",
      type: "S6",
      yearStanding: "3rd year",
      details: "Detailed information about Jerald Labalan"
    },
    
    {
      id: "20231002",
      lastName: "Dasalla",
      firstName: "Keith",
      middleName: "Sikip",
      type: "S6",
      yearStanding: "3rd year",
      details: "Detailed information about Keith Dasalla"
    },
    {
      id: "20231003",
      lastName: "Bides",
      firstName: "Matthew",
      middleName: "Tigastite",
      type: "S5",
      yearStanding: "3rd year",
      details: "Detailed information about John Cortez"
    }
    
  ]);

  const [showModal, setShowModal] = useState(false); // Track modal visibility
  const [selectedStudent, setSelectedStudent] = useState(null); // Store selected student

  const handleViewChecklist = (student) => {
    setSelectedStudent(student);  // Set the selected student
    setShowModal(true);  // Show the modal
  };

  const closeModal = () => {
    setShowModal(false);  // Close the modal
    setSelectedStudent(null);  // Reset the selected student
  };

  const styles = {
    header: {
      backgroundColor: "#2c2c2c",  // Dark background for the header
      color: "white",
      padding: "15px 25px",  // Add some space for a clean, spacious look
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Slight shadow for depth
      fontFamily: "'Poppins', sans-serif", // Use the Poppins font for a modern look
      fontWeight: "600", // Slightly bolder font weight for better visibility
      letterSpacing: "0.5px", // Slight letter spacing for readability
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      gap: "15px", // Increased gap for better spacing between logos
    },
    logoImage: {
      width: "35px",  // Slightly larger logo size
      height: "35px",
      borderRadius: "50%", // Circular logos
      objectFit: "cover",
      transition: "transform 0.3s ease", // Add animation on hover
    },
    nav: {
      display: "flex",
      gap: "100px",  // Increased gap between links for a less cramped look
      fontSize: "20px", // Slightly larger font size for better readability
      fontWeight: "500", // Slightly lighter weight for a more elegant feel
    },
    navLink: {
      color: "white",
      textDecoration: "none",
      transition: "color 0.3s ease, transform 0.3s ease", // Smooth color and transform transition
      letterSpacing: "0.8px", // Slightly more letter spacing
      textTransform: "capitalize", // Ensure the first letter is capitalized
    },
    navLinkHover: {
      color: "#FF6347", // Hover color changes to a bright reddish hue
      transform: "scale(1.1)", // Slightly scale up on hover for a more interactive feel
    },
  
  
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    thTd: {
      border: "1px solid #ddd",
      padding: "10px",
      textAlign: "left",
      backgroundColor: "#1A1A1D",
      color: "white",
      fontWeight: "bold",
      borderRadius: "15px", // Adds rounded corners to table headers
    },
    td: {
      border: "1px solid #ddd",
      padding: "10px",
      textAlign: "left",
      color: "black", // Sets font color of student data to black
      borderRadius: "15px", // Adds rounded corners to table data cells
    },
    button: {
      margin: "5px",
      padding: "5px 10px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "20px", // Rounded button
      cursor: "pointer",
    },
    filterBar: {
      marginTop: "10px",
      display: "flex",
      gap: "10px",
    },
    label: {
      color: "black", // Sets label text to black
    },
    input: {
      padding: "5px 10px",
      border: "1px solid #ccc",
      borderRadius: "15px", // Rounded input fields
      backgroundColor: "white",
      color: "black", // Sets input text to black
    },
    select: {
      padding: "5px 10px",
      border: "1px solid #ccc",
      borderRadius: "15px", // Rounded select fields
      backgroundColor: "white",
      color: "black", // Ensures dropdown options are black
    },
    modal: {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "10px",
      width: "80%",
      maxWidth: "600px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    closeButton: {
      backgroundColor: "#FF6347",
      color: "white",
      padding: "10px",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      marginTop: "20px",
      float: "right",
    }
  };

  return (
    <div>
    {/* Header */}
    <header style={{ 
  ...styles.header, 
  position: "fixed", 
  top: "0", 
  width: "100%", 
  zIndex: "1000", 
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
}}>
  <div style={styles.logoContainer}>
    <img 
      src="src/assets/images/bscslogo.jpg" 
      alt="Logo 1" 
      style={styles.logoImage} 
    />
    <img 
      src="src/assets/images/bsitlogo.jpg" 
      alt="Logo 2" 
      style={styles.logoImage} 
    />
  </div>
  <nav style={styles.nav}>
    <a href="#" style={styles.navLink} onMouseEnter={(e) => e.target.style.color = styles.navLinkHover.color} onMouseLeave={(e) => e.target.style.color = "white"}>
      Dashboard
    </a>
    <a href="#" style={styles.navLink} onMouseEnter={(e) => e.target.style.color = styles.navLinkHover.color} onMouseLeave={(e) => e.target.style.color = "white"}>
      Submissions
    </a>
    <a href="#" style={styles.navLink} onMouseEnter={(e) => e.target.style.color = styles.navLinkHover.color} onMouseLeave={(e) => e.target.style.color = "white"}>
      Advisee
    </a>
    <a href="#" style={styles.navLink} onMouseEnter={(e) => e.target.style.color = styles.navLinkHover.color} onMouseLeave={(e) => e.target.style.color = "white"}>
      Log Out
    </a>
  </nav>
</header>
  
<div style={{ padding: "80px 20px 20px" }}> {/* Add top padding to push content below the fixed header */}
  <h2 style={{ color: "black", fontFamily: "'Poppins', sans-serif", fontWeight: "600", fontSize: "24px", letterSpacing: "0.5px" }}>
    Submissions
  </h2>
  {/* The rest of your content goes here */}


        {/* Search */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ marginRight: "10px", ...styles.label }}>Search</label>
          <input type="text" placeholder="Search..." style={styles.input} />
        </div>

        {/* Table */}
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.thTd}>Student ID</th>
                <th style={styles.thTd}>Last Name</th>
                <th style={styles.thTd}>First Name</th>
                <th style={styles.thTd}>Middle Name</th>
                <th style={styles.thTd}>Student Type</th>
                <th style={styles.thTd}>Year Standing</th>
                <th style={styles.thTd}>Commands</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td style={styles.td}>{student.id}</td>
                  <td style={styles.td}>{student.lastName}</td>
                  <td style={styles.td}>{student.firstName}</td>
                  <td style={styles.td}>{student.middleName}</td>
                  <td style={styles.td}>{student.type}</td>
                  <td style={styles.td}>{student.yearStanding}</td>
                  <td style={styles.td}>
                    <button 
                      style={styles.button} 
                      onClick={() => handleViewChecklist(student)}
                    >
                      View Checklist
                    </button>
                    <button style={styles.button}>View ISCOR</button>
                    <button style={styles.button}>Reject</button>
                    <button style={styles.button}>Accept</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: "20px", ...styles.filterBar }}>
    <label style={styles.label}>Sort by:</label>
    <select style={styles.select}>
      <option>Enrollment Date</option>
      {/* Add more options */}
    </select>

    <label style={styles.label}>Student Type:</label>
    <select style={styles.select}>
      <option>S1</option>
      <option>S2</option>
      <option>S3</option>
      <option>S4</option>
      <option>S5</option>
      <option>S6</option>
      {/* Add more options */}
    </select>

    <label style={styles.label}>Year Standing:</label>
    <select style={styles.select}>
      <option>1st year</option>
      <option>2nd Year</option>
      <option>3rd year</option>
      <option>4th year</option>
      {/* Add more options */}
    </select>
  </div>

      </div>

      {/* Modal for displaying details */}
      {showModal && selectedStudent && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Student Details</h3>
            <p><strong>Student ID:</strong> {selectedStudent.id}</p>
            <p><strong>Last Name:</strong> {selectedStudent.lastName}</p>
            <p><strong>First Name:</strong> {selectedStudent.firstName}</p>
            <p><strong>Middle Name:</strong> {selectedStudent.middleName}</p>
            <p><strong>Student Type:</strong> {selectedStudent.type}</p>
            <p><strong>Year Standing:</strong> {selectedStudent.yearStanding}</p>
            <p><strong>Details:</strong> {selectedStudent.details}</p>
            <button style={styles.closeButton} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enrollees;