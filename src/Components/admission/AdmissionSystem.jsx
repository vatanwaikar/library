import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdmissionDashboard from './AdmissionDashboard';
import AddAdmissionForm from './AddAdmissionForm';
import AdmissionList from './AdmissionList';
import AdmissionSettings from './AdmissionSettings';

function AdmissionSystem() {
  return (
    <div>
      
      <Routes>
        <Route path="dashboard" element={<AdmissionDashboard />} />
        <Route path="add-admission" element={<AddAdmissionForm />} />
        <Route path="admission-list" element={<AdmissionList />} />
        <Route path="settings" element={<AdmissionSettings />} />
      </Routes>
    </div>
  );
}

export default AdmissionSystem;