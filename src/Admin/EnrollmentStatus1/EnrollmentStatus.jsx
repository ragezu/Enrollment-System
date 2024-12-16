import React, { useState } from "react";
import { Typography, TextField, Select, MenuItem, Table, TableHead, TableRow, TableCell, TableBody, FormControl, InputLabel, Button } from "@mui/material";



const EnrollmentStatus = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Enrollment Date");
  const [studentType, setStudentType] = useState("S6");
  const [yearStanding, setYearStanding] = useState("5th or more");
  const [status, setStatus] = useState("Step 1 Done");

  const handleSearchChange = (e) => setSearch(e.target.value);

  const data = [
    { id: 20242022, lastName: "Dasalla", firstName: "Keith", middleName: "bbc", studentType: "S1", status: "Step 1 Done" },
    { id: 20242023, lastName: "Labalan", firstName: "Jerald", middleName: "bbc", studentType: "S1", status: "Step 2 Pending" },
    { id: 20232024, lastName: "Orcullo", firstName: "James Andrei", middleName: "bbc", studentType: "S1", status: "Step 1 Done" },
  ];

  return (
    <div className="enrollment-status-container">
      <Typography 
        variant="h4" 
        gutterBottom
        sx={{
          fontFamily: "'Arial', sans-serif", // Replace with any custom font
          fontWeight: "bold", // Optional for bold text
        }}
      >
        Enrollment Status
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        value={search}
        onChange={handleSearchChange}
        style={{
          marginBottom: "20px",
          width: "50%", // Adjust width
        }}
      />
  
      <Table className="status-table">
      <TableHead>
  <TableRow>
    {["Student ID", "Last Name", "First Name", "Middle Name", "Student Type", "Status", "Commands"].map((header) => (
      <TableCell key={header} className="table-header">
        {header}
      </TableCell>
    ))}
  </TableRow>
</TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.middleName}</TableCell>
                <TableCell>{row.studentType}</TableCell>
                <TableCell>
  <Select value={status}onChange={(e) => setStatus(e.target.value)}
    className="status-select" >
                    <MenuItem value="Step 1 Done">Step 1 Done</MenuItem>
    <MenuItem value="Step 2 Pending">Step 2 Pending</MenuItem>
  </Select>
</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary">Mark as Enrolled</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} style={{ textAlign: "center" }}>
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

       <div className="filters">
        <FormControl>
          <InputLabel>Sort by</InputLabel>
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <MenuItem value="Enrollment Date">Enrollment Date</MenuItem>
            <MenuItem value="Name">Name</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Student Type</InputLabel>
          <Select value={studentType} onChange={(e) => setStudentType(e.target.value)}>
            <MenuItem value="S6">S1</MenuItem>
            <MenuItem value="S6">S2</MenuItem>
            <MenuItem value="S6">S3</MenuItem>
            <MenuItem value="S6">S4</MenuItem>
            <MenuItem value="S6">S5</MenuItem>
            <MenuItem value="S6">S6</MenuItem>
            <MenuItem value="S7">S7</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Year Standing</InputLabel>
          <Select value={yearStanding} onChange={(e) => setYearStanding(e.target.value)}>
            <MenuItem value="5th or more">5th</MenuItem>
            <MenuItem value="4th">4th</MenuItem>
            <MenuItem value="4th">3rd</MenuItem>
            <MenuItem value="4th">2nd</MenuItem>
            <MenuItem value="4th">1st</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default EnrollmentStatus;
