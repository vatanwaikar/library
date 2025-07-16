// addInquiryForm.js

// Create Inquiry
export async function createInquiry(formData) {
  const response = await fetch('http://localhost:8103/createInquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  if (!response.ok) throw new Error('Failed to create inquiry');
  return response.json();
}

// Get All Inquiries
export async function getAllInquiries() {
  const response = await fetch('http://localhost:8103/getAllInquiries');
  if (!response.ok) throw new Error('Failed to fetch inquiries');
  return response.json();
}

// Get Inquiry By Id
export async function getInquiryById(id) {
  const response = await fetch(`http://localhost:8103/getInquiryById/${id}`);
  if (!response.ok) throw new Error('Failed to fetch inquiry');
  return response.json();
}

// Update Inquiry
export async function updateInquiry(id, formData) {
  const response = await fetch(`http://localhost:8103/updateInquiry/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  if (!response.ok) throw new Error('Failed to update inquiry');
  return response.json();
}

// Delete Inquiry
export async function deleteInquiry(id) {
  const response = await fetch(`http://localhost:8103/deleteInquiry/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete inquiry');
  return response;
}

// Get Monthly Inquiry Count
export async function getMonthlyInquiryCount(year, month) {
  const response = await fetch(`http://localhost:8103/getMonthlyInquiryCount?year=${year}&month=${month}`);
  if (!response.ok) throw new Error('Failed to fetch monthly inquiry count');
  return response.json();
}

// Get Daily Inquiry Counts
export async function getDailyInquiryCounts(year, month) {
  const response = await fetch(`http://localhost:8103/getDailyInquiryCounts?year=${year}&month=${month}`);
  if (!response.ok) throw new Error('Failed to fetch daily inquiry counts');
  return response.json();
}

// Get Inquiry Counts
export async function getInquiryCounts() {
  const response = await fetch('http://localhost:8103/getInquiryCounts');
  if (!response.ok) throw new Error('Failed to fetch inquiry counts');
  return response.json();
}