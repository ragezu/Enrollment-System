import React, { useState } from "react";
import styles from "./Enrollees.module.css"; // Ensure this file exists
import DashboardHeader from "../Dashboard/DashboardHeader";

const Enrollees = () => {
  const [students, setStudents] = useState([
    {
      id: "20231001",
      lastName: "Labalan",
      firstName: "Jerald",
      middleName: "Sikip",
      type: "S6",
      yearStanding: "3rd year",
      details: "Detailed information about Jerald Labalan",
    },
    {
      id: "20231001",
      lastName: "Fernandez",
      firstName: "Alex",
      middleName: "tingenhawak",
      type: "S6",
      yearStanding: "3rd year",
      details: "Detailed information about Jerald Labalan",
    },
    {
      id: "20231001",
      lastName: "Galvez",
      firstName: "Dioren",
      middleName: "Golem",
      type: "S6",
      yearStanding: "3rd year",
      details: "Detailed information about Jerald Labalan",
    },

    {
      id: "20231002",
      lastName: "Dasalla",
      firstName: "Keith",
      middleName: "Sikip",
      type: "S6",
      yearStanding: "3rd year",
      details: "Detailed information about Keith Dasalla",
    },
    {
      id: "20231003",
      lastName: "Bides",
      firstName: "Matthew",
      middleName: "Tigastite",
      type: "S5",
      yearStanding: "3rd year",
      details: "Detailed information about John Cortez",
    },
    {
      id: "20231003",
      lastName: "Bides",
      firstName: "Matthew",
      middleName: "Tigastite",
      type: "S5",
      yearStanding: "3rd year",
      details: "Detailed information about John Cortez",
    },
    {
      id: "20231003",
      lastName: "Bides",
      firstName: "Matthew",
      middleName: "Tigastite",
      type: "S5",
      yearStanding: "3rd year",
      details: "Detailed information about John Cortez",
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false); // New state for reject modal
  const [rejectReason, setRejectReason] = useState(""); // To store the reason input

  const handleViewChecklist = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleRejectClick = (student) => {
    setSelectedStudent(student);
    setShowRejectModal(true); // Open reject modal
  };

  const closeRejectModal = () => {
    setShowRejectModal(false);
    setRejectReason(""); // Clear textarea when modal closes
  };

  const handleRejectSubmit = () => {
    // Handle the rejection logic here (e.g., send data to backend)
    console.log(`Rejected student ${selectedStudent.id} with reason: ${rejectReason}`);
    closeRejectModal();
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div>
        <DashboardHeader />
      </div>

      <div className={styles.content_holder}>
        <div className={styles.content}>
          <h1 className={styles.title}>Submissions</h1>

          {/* Search */}
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search..."
              className={styles.input}
            />
          </div>

          {/* Table */}
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.thTd}>Student ID</th>
                  <th className={styles.thTd}>Last Name</th>
                  <th className={styles.thTd}>First Name</th>
                  <th className={styles.thTd}>Middle Name</th>
                  <th className={styles.thTd}>Student Type</th>
                  <th className={styles.thTd}>Year Standing</th>
                  <th className={styles.thTd}>Commands</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td className={styles.td}>{student.id}</td>
                    <td className={styles.td}>{student.lastName}</td>
                    <td className={styles.td}>{student.firstName}</td>
                    <td className={styles.td}>{student.middleName}</td>
                    <td className={styles.td}>{student.type}</td>
                    <td className={styles.td}>{student.yearStanding}</td>
                    <td className={styles.td}>
                      <button
                        className={styles.button}
                        onClick={() => handleViewChecklist(student)}
                      >
                        View Checklist
                      </button>
                      <button className={styles.button}>View ISCOR</button>
                      <button
                        className={styles.button}
                        onClick={() => handleRejectClick(student)}
                      >
                        Reject
                      </button>
                      <button className={styles.button}>Accept</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.filterBar}>
            <div className={styles.sort}>
              <label className={styles.label}>Sort by:</label>
              <select className={styles.select}>
                <option>Enrollment Date</option>
              </select>
            </div>
            {/* Add other filters */}

            <div className={styles.sort}>
              <label className={styles.label}>Student Type:</label>
              <select className={styles.select}>
                <option>S1</option>
                <option>S2</option>
                <option>S3</option>
                <option>S4</option>
                <option>S5</option>
                <option>S6</option>
                {/* Add more options */}
              </select>
            </div>

            <div className={styles.sort}>
              <label className={styles.label}>Year Standing:</label>
              <select className={styles.select}>
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
                {/* Add more options */}
              </select>
            </div>

            <button className={styles.export_button}>
              Export as Spreadsheet
            </button>
          </div>
        </div>
      </div>

      {/* Existing Modal */}
      {showModal && selectedStudent && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Student Details</h3>
            <p>
              <strong>Student ID:</strong> {selectedStudent.id}
            </p>
            {/* Add more student details */}
            <button className={styles.closeButton} onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* New Reject Modal */}
      {showRejectModal && selectedStudent && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Reject Student: {selectedStudent.firstName} {selectedStudent.lastName}</h3>
            <textarea
              className={styles.textarea}
              placeholder="Enter rejection reason..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div className={styles.buttonGroup}>
              <button className={styles.button} onClick={handleRejectSubmit}>
                Submit
              </button>
              <button className={styles.closeButton} onClick={closeRejectModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enrollees;
