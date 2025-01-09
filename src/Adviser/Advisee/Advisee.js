import React, { useState, useRef } from "react";
import styles from "./Advisee.module.css";
import Header from "../Header/Header";

const PreEnrollmentModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
};

const EditSubjectsModal = ({ student, onClose, onSubmit }) => {
  const [subjects, setSubjects] = useState([
    { id: 1, code: "MATH101", title: "Basic Mathematics", units: 3 },
    { id: 2, code: "ENG101", title: "English Language", units: 3 },
  ]);

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    setSubjects(updatedSubjects);
  };

  const handleSubmit = () => {
    onSubmit({ studentId: student.id, updatedSubjects: subjects });
    onClose();
  };

  return (
    <div className={styles.Emodal}>
      <div className={styles.EmodalContent}>
        <h2>
          Edit Subjects for {student.firstName} {student.lastName}
        </h2>
        <table className={styles.subjectTable}>
          <thead>
            <tr>
              <th>Class Code</th>
              <th>Course/Subject Title</th>
              <th>Number of Units</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={subject.id}>
                <td>
                  <input
                    type="text"
                    value={subject.code}
                    onChange={(e) =>
                      handleSubjectChange(index, "code", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={subject.title}
                    onChange={(e) =>
                      handleSubjectChange(index, "title", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={subject.units}
                    onChange={(e) =>
                      handleSubjectChange(index, "units", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className={styles.EsubmitButton} onClick={handleSubmit}>
          Save Changes
        </button>
        <button className={styles.EcloseButton} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const Advisee = () => {
  const [students, setStudents] = useState([
    {
      id: "20231001",
      lastName: "Labalan",
      firstName: "Jerald",
      middleName: "Sikip",
      type: "S6",
      yearStanding: "3rd year",
      AdvisingStatus: "Rejected",
      details: "Detailed information about Jerald Labalan",
    },
    {
      id: "20231002",
      lastName: "Fernandez",
      firstName: "Alex",
      middleName: "Hawak",
      type: "S6",
      yearStanding: "3rd year",
      AdvisingStatus: "Accepted",
      details: "Detailed information about Alex Fernandez",
    },
    {
      id: "20231003",
      lastName: "Galvez",
      firstName: "Dioren",
      middleName: "Golem",
      type: "S6",
      yearStanding: "3rd year",
      AdvisingStatus: "Accepted",
      details: "Detailed information about Dioren Galvez",
    },
    {
      id: "20231004",
      lastName: "Dasalla",
      firstName: "Keith",
      middleName: "Sikip",
      type: "S5",
      yearStanding: "3rd year",
      AdvisingStatus: "Accepted",
      details: "Detailed information about Keith Dasalla",
    },
    {
      id: "20231005",
      lastName: "Bides",
      firstName: "Matthew",
      middleName: "Tigastite",
      type: "S5",
      yearStanding: "2nd year",
      AdvisingStatus: "Accepted",
      details: "Detailed information about Matthew Bides",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState(""); // For search input
  const [sortCriteria, setSortCriteria] = useState("id"); // Default sorting criteria
  const [filterType, setFilterType] = useState(""); // For student type filter
  const [filterYear, setFilterYear] = useState(""); // For year standing filter
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showBondPaperModal, setShowBondPaperModal] = useState(false);
  const printContentRef = useRef(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false);

  const handleEditSubjectClick = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedStudent(null);
  };

  const handleEditSubjectSubmit = (payload) => {
    console.log("Submitted payload:", payload);
    // Add logic to update subjects in your database or state
  };

  const handlePrint = () => {
    const printContent = printContentRef.current;

    if (printContent) {
      const printWindow = window.open("", "_blank");

      printWindow.document.write(`
        <html>
          <head>
            <title>Pre-Enrollment Form</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
              }
              h2, h3, h4, p {
                text-align: center;
                margin-bottom: 5px;
              }
              img {
              display: block;
              margin: 0 auto;
              width: 80px; /* Adjust size */
              height: auto;
              margin-bottom: -15px;
              }
              
              h5 {
                font-size: 20px;
                margin-bottom: 5px;
              }
              p2 {
                margin-left: 380px;
                text-align: center;
              }

              p3 {
                margin-left: 350px;
                text-align: center;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
              }
              th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: left;
              }
              th {
                background-color: #f2f2f2;
              }
                button{
                display: none;
                }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `);

      // Ensure content is loaded before printing
      printWindow.document.close();
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };
    }
  };

  const [enrollmentDate, setEnrollmentDate] = useState(""); // State for enrollment date
  const filteredAndSortedStudents = students
    .filter((student) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        student.id.toLowerCase().includes(query) ||
        student.lastName.toLowerCase().includes(query) ||
        student.firstName.toLowerCase().includes(query);

      const matchesType = filterType ? student.type === filterType : true;
      const matchesYear = filterYear
        ? student.yearStanding === filterYear
        : true;

      return matchesSearch && matchesType && matchesYear;
    })
    .sort((a, b) => {
      if (sortCriteria === "id") {
        return a.id.localeCompare(b.id);
      } else if (sortCriteria === "lastName") {
        return a.lastName.localeCompare(b.lastName);
      } else if (sortCriteria === "firstName") {
        return a.firstName.localeCompare(b.firstName);
      }
      return 0;
    });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleFilterYearChange = (e) => {
    setFilterYear(e.target.value);
  };

  const handleViewChecklist = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleSetEnrollmentDateClick = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedStudent(null);
    setEnrollmentDate("");
  };
  const handleEnrollmentDateSubmit = () => {
    console.log(`Enrollment date for ${selectedStudent.id}: ${enrollmentDate}`);
    // You can add further logic to update the student's record here
    handleModalClose();
  };

  const handleViewPreEnrollmentClick = () => {
    setShowBondPaperModal(true);
  };

  const handleCloseBondPaperModal = () => {
    setShowBondPaperModal(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Header />
      </header>

      <div className={styles.content_holder}>
        <div className={styles.content}>
          <h1 className={styles.title}>Advisee</h1>

          {/* Search */}
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search..."
              className={styles.input}
              value={searchQuery}
              onChange={handleSearchChange}
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
                  <th className={styles.thTd}>Student Type</th>
                  <th className={styles.thTd}>Year Standing</th>
                  <th className={styles.thTd}>Advising Status</th>
                  <th className={styles.thTd}>Commands</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedStudents.map((student) => (
                  <tr key={student.id}>
                    <td className={styles.td}>{student.id}</td>
                    <td className={styles.td}>{student.lastName}</td>
                    <td className={styles.td}>{student.firstName}</td>
                    <td className={styles.td}>{student.type}</td>
                    <td className={styles.td}>{student.yearStanding}</td>
                    <td className={styles.td}>{student.AdvisingStatus}</td>
                    <td className={styles.td}>
                      <button className={styles.button}>View Subject</button>
                      <button
                        className={styles.button}
                        onClick={() => handleEditSubjectClick(student)}
                      >
                        Edit Subject
                      </button>
                      
                     
                      <button className={styles.button}>Edit Subject</button>
                      <button className={styles.button}>Update Status</button>
                      <button className={styles.button}>View Checklist</button>
                      <button className={styles.button}>View ISCOR</button>
                      <button
                        className={styles.button}
                        onClick={handleViewPreEnrollmentClick}
                      >
                        View Pre-Enrollment Form
                      </button>
                      <button
                        className={styles.button}
                        onClick={() => handleSetEnrollmentDateClick(student)}
                      >
                        Set Enrollment Date
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.filterBar}>
          <div className={styles.sort}>
            <label className={styles.label}>Sort by:</label>
            <select
              className={styles.select}
              value={sortCriteria}
              onChange={handleSortChange}
            >
              <option value="id">Student ID</option>
              <option value="lastName">Last Name</option>
              <option value="firstName">First Name</option>
            </select>
          </div>

          <div className={styles.sort}>
            <label className={styles.label}>Student Type:</label>
            <select
              className={styles.select}
              value={filterType}
              onChange={handleFilterTypeChange}
            >
              <option value="">All</option>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
              <option value="S3">S3</option>
              <option value="S4">S4</option>
              <option value="S5">S5</option>
              <option value="S6">S6</option>
            </select>
          </div>

          <div className={styles.sort}>
            <label className={styles.label}>Year Standing:</label>
            <select
              className={styles.select}
              value={filterYear}
              onChange={handleFilterYearChange}
            >
              <option value="">All</option>
              <option value="1st year">1st Year</option>
              <option value="2nd year">2nd Year</option>
              <option value="3rd year">3rd Year</option>
              <option value="4th year">4th Year</option>
            </select>
          </div>
        </div>
      </div>
      {/* View Checklist Modal */}
      {showModal && selectedStudent && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Student Details</h3>
            <p>
              <strong>Student ID:</strong> {selectedStudent.id}
            </p>
            {/* Add more details */}
            <button
              className={styles.closeButton}
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Set Enrollment Date Modal */}
      {showModal && selectedStudent && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Set Enrollment Date </h3>
            <h2>
              {selectedStudent.firstName} {selectedStudent.lastName}
            </h2>
            <label for="date-input" className={styles.dateLabel}>
              Select Date
            </label>
            <input
              type="date"
              className={styles.input}
              value={enrollmentDate}
              onChange={(e) => setEnrollmentDate(e.target.value)}
            />
            <div className={styles.buttonGroup}>
              <button className={styles.closeButton} onClick={handleModalClose}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
      {showBondPaperModal && (
        <div className={styles.Premodal}>
          <div className={styles.PremodalContent} ref={printContentRef}>
            <div className={styles.preEnrollmentForm}>
              <img
                logo
                src="./images/cvsu.png"
                alt="logo"
                className={styles.logo}
              />
              <h2>Republic of the Philippines</h2>
              <h3>CAVITE STATE UNIVERSITY</h3>
              <h4>BACOOR CITY CAMPUS</h4>
              <p>SHV, Molino VI, City of Bacoor</p>
              <p>(046) 476-5029</p>
              <p>cvsu.bacoor@cvsu.edu.ph</p>
              <h2>PRE-ENROLLMENT FORM</h2>

              <div className={styles.personalInfo}>
                <h5 className={styles.h5}>Personal Information</h5>
                <div className={styles.infoRow}>
                  <p1>Name:</p1>
                  <p2>Email Address:</p2>
                </div>
                <div className={styles.infoRow}>
                  <p1>Address:</p1>
                  <p3>Contact Number:</p3>
                </div>
                <div className={styles.infoRow}>
                  <p1>Program:</p1>
                </div>
                <div className={styles.infoRow}>
                  <p1>Student Category:</p1>
                </div>
              </div>

              <div className={styles.subjects}>
                <h3>Subjects</h3>
                <table className={styles.subjectTable}>
                  <thead>
                    <tr>
                      <th>Class Code</th>
                      <th>Course/Subject Title</th>
                      <th>Number of Units</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 10 }).map((_, index) => (
                      <tr key={index}>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <button className={styles.printButton} onClick={handlePrint}>
              Print
            </button>
          </div>
          <button
            className={styles.PrecloseButton}
            onClick={handleCloseBondPaperModal}
          >
            X
          </button>
        </div>
      )}

      {isEditModalOpen && selectedStudent && (
        <EditSubjectsModal
          student={selectedStudent}
          onClose={closeEditModal}
          onSubmit={handleEditSubjectSubmit}
        />
      )}
    </div>
  );
};

export default Advisee;
