import React, { useState } from "react";
import styles from './EnrollmentStatus.module.css'

const EnrollmentStatus = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Step 1 Done");
  const [sortBy, setSortBy] = useState("Enrollment Date");
  const [studentType, setStudentType] = useState("S6");
  const [yearStanding, setYearStanding] = useState("5th or more");

  const handleSearchChange = (e) => setSearch(e.target.value);

  const data = [
    { id: 20242022, lastName: "Dasalla", firstName: "Keith", middleName: "bbc", studentType: "S1", status: "Step 1 Done" },
    { id: 20242023, lastName: "Labalan", firstName: "Jerald", middleName: "bbc", studentType: "S1", status: "Step 2 Pending" },
    { id: 20232024, lastName: "Orcullo", firstName: "James Andrei", middleName: "bbc", studentType: "S1", status: "Step 1 Done" },
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ fontWeight: "bold" }}>Enrollment Status</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleSearchChange}
        style={{
          marginBottom: "20px",
          width: "50%",
          padding: "8px",
          fontSize: "14px",
        }}
      />

      {/* Table */}
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {["Student ID", "Last Name", "First Name", "Middle Name", "Student Type", "Status", "Commands"].map((header) => (
              <th key={header} style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.lastName}</td>
                <td>{row.firstName}</td>
                <td>{row.middleName}</td>
                <td>{row.studentType}</td>
                <td>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    style={{ padding: "5px" }}
                  >
                    <option value="Step 1 Done">Step 1 Done</option>
                    <option value="Step 2 Pending">Step 2 Pending</option>
                  </select>
                </td>
                <td>
                  <button style={{ padding: "5px 10px", cursor: "pointer" }}>Mark as Enrolled</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Filters */}
      <div style={{ marginTop: "20px", display: "flex", gap: "20px" }}>
        {/* Sort By */}
        <div>
          <label>Sort by: </label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: "5px" }}>
            <option value="Enrollment Date">Enrollment Date</option>
            <option value="Name">Name</option>
          </select>
        </div>

        {/* Student Type */}
        <div>
          <label>Student Type: </label>
          <select value={studentType} onChange={(e) => setStudentType(e.target.value)} style={{ padding: "5px" }}>
            <option value="S1">S1</option>
            <option value="S2">S2</option>
            <option value="S3">S3</option>
            <option value="S4">S4</option>
            <option value="S5">S5</option>
            <option value="S6">S6</option>
            <option value="S7">S7</option>
          </select>
        </div>

        {/* Year Standing */}
        <div>
          <label>Year Standing: </label>
          <select value={yearStanding} onChange={(e) => setYearStanding(e.target.value)} style={{ padding: "5px" }}>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
            <option value="5th or more">5th</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentStatus;
