import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InquiryDashboard from './InquiryDashboard';
import AddInquiryForm from './AddInquiryForm';
import InquiryList from './InquiryList';

function InquirySystem() {
  return (
    <div>
      <Routes>
        <Route path="dashboard" element={<InquiryDashboard />} />
        <Route path="add-inquiry" element={<AddInquiryForm />} />
        <Route path="inquiry-list" element={<InquiryList />} />
      </Routes>
    </div>
  );
}

export default InquirySystem;