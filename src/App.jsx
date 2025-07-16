// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import InquirySystem from './Components/inquiry/InquirySystem';
import AdmissionSystem from './Components/admission/AdmissionSystem';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div>
          <Routes>
            {/* Root redirect */}
            <Route path="/" element={<Navigate to="/inquiry/dashboard" replace />} />
            
            {/* Existing routes */}
            <Route path="/inquiry/*" element={<InquirySystem />} />
            <Route path="/admission/*" element={<AdmissionSystem />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;