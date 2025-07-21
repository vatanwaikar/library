// addInquiryForm.js

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Create Inquiry
export async function createInquiry(formData) {
  const res = await fetch(`${BASE_URL}/createInquiry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error("Failed to create inquiry");
  return res.json();
}

// Get All Inquiries
export async function getAllInquiries() {
  const res = await fetch(`${BASE_URL}/getAllInquiries`);
  if (!res.ok) throw new Error("Failed to fetch inquiries");
  return res.json();
}

// Get Inquiry By ID
export async function getInquiryById(id) {
  const res = await fetch(`${BASE_URL}/getInquiryById/${id}`);
  if (!res.ok) throw new Error("Failed to fetch inquiry");
  return res.json();
}

// Update Inquiry
export async function updateInquiry(id, formData) {
  const res = await fetch(`${BASE_URL}/updateInquiry/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error("Failed to update inquiry");
  return res.json();
}

// Delete Inquiry
export async function deleteInquiry(id) {
  const res = await fetch(`${BASE_URL}/deleteInquiry/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete inquiry");
  return res.text(); // or `res.json()` if your API returns JSON
}

// Get Monthly Inquiry Count
export async function getMonthlyInquiryCount(year, month) {
  const res = await fetch(`${BASE_URL}/getMonthlyInquiryCount?year=${year}&month=${month}`);
  if (!res.ok) throw new Error("Failed to fetch monthly inquiry count");
  return res.json();
}

// Get Daily Inquiry Counts
export async function getDailyInquiryCounts(year, month) {
  const res = await fetch(`${BASE_URL}/getDailyInquiryCounts?year=${year}&month=${month}`);
  if (!res.ok) throw new Error("Failed to fetch daily inquiry counts");
  return res.json();
}

// Get Overall Inquiry Counts (e.g. today, this week, this month etc.)
export async function getInquiryCounts() {
  const res = await fetch(`${BASE_URL}/getInquiryCounts`);
  if (!res.ok) throw new Error("Failed to fetch inquiry counts");
  return res.json();
}
