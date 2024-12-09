import React from "react";
import Login from "./General/Login/Login";
import Homepage from "./Homepage";
import Register from "./Student/Register/Register";
import EmailVerification from "./Student/EmailVerification/EmailVerification";
import SubmissionAndSubject from "./Student/SubmissionAndSubject/SubmissionAndSubject";
import Landingpage from "./General/LandingPage/Landingpage";
import AnnouncementsPage from "./General/Announcement/AnnouncementsPage";
import Dashboard from "./Admin/Dashboard/Dashboard";
import Home from "./Student/Home/Home";
import Enrollees from "./Admin/Enrollees/Enrollees";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SuccessRegular from "./Student/SubmissionAndSubject/SuccessRegular";
import SuccessIrregular from "./Student/SubmissionAndSubject/SuccessIrregular";
import UploadRegular from  "./Student/SubmissionAndSubject/UploadRegular";
import UploadIrregular from  "./Student/SubmissionAndSubject/UploadIrregular";
import Profile from "./Student/Profile/Profile";
import StatusAndScheduling from "./Student/StatusAndScheduling/StatusAndScheduling";
import EnrollmentTeam from "./Admin/EnrollmentTeam/EnrollmentTeam";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/emailverification" element={<EmailVerification />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/submissionandsubject"
          element={<SubmissionAndSubject />}
        />

        <Route
          path="/statusandscheduling"
          element={<StatusAndScheduling />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/SuccessRegular" element={<SuccessRegular />} />
        <Route path="/SuccessIrregular" element={<SuccessIrregular />} />
        <Route path="/UploadRegular" element={<UploadRegular />} />
        <Route path="/UploadIrregular" element={<UploadIrregular />} />
        <Route path="/enrollee" element={<Enrollees />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/enrollmentteam" element={<EnrollmentTeam />} />
      </Routes>
    </Router>
  );
}

export default App;
