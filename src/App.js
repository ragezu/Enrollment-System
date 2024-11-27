import React from 'react';
import Login from './General/Login/Login';
import Homepage from './Homepage';
import Register from './Student/Register/Register';
import EmailVerification from './Student/EmailVerification/EmailVerification';
import SubmissionAndSubject from './Student/SubmissionAndSubject/SubmissionAndSubject';
import Landingpage from './General/LandingPage/Landingpage';
import AnnouncementsPage from './General/Announcement/AnnouncementsPage';
import Dashboard from './Admin/Dashboard/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
            </Routes>
        </Router>
    );
}

export default App;
