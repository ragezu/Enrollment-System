import React from 'react';
import Login from './General/Login/Login';
import Homepage from './Homepage';
import Register from './Student/Register/Register';
import EmailVerification from './Student/EmailVerification/EmailVerification';
import Landingpage from './General/LandingPage/Landingpage';
import AnnouncementsPage from './General/Announcement/AnnouncementsPage';
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
            </Routes>
        </Router>
    );
}

export default App;
