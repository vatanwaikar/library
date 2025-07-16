const BASE_URL = "http://localhost:8103";

// Create Admission
export async function createAdmission(formData) {
  const response = await fetch(`${BASE_URL}/createAdmission`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!response.ok) throw new Error("Failed to create admission");
  return response.json();
}

// Get All Admissions
export async function getAllAdmissions() {
  const response = await fetch(`${BASE_URL}/getAllAdmissions`);
  if (!response.ok) throw new Error("Failed to fetch admissions");
  return response.json();
}

// Get Admission By Id
export async function getAdmissionById(id) {
  const response = await fetch(`${BASE_URL}/getAdmissionById/${id}`);
  if (!response.ok) throw new Error("Failed to fetch admission");
  return response.json();
}

// Update Admission
export async function updateAdmission(id, formData) {
  const response = await fetch(`${BASE_URL}/updateAdmission/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!response.ok) throw new Error("Failed to update admission");
  return response.json();
}

// Delete Admission
export async function deleteAdmission(id) {
  const response = await fetch(`${BASE_URL}/deleteAdmission/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete admission");
  return response;
}
//get seat availability
export async function getSeatAvailability(seatType) {
    const response = await fetch(`${BASE_URL}/getSeatAvailability/${seatType}`);
    if (!response.ok) throw new Error("Failed to fetch seat availability");
    return response.json();
  }

  // In addAdmissionForm.js
export async function getAdmissionStatistics() {
  const response = await fetch(`${BASE_URL}/getAdmissionStatistics`);
  if (!response.ok) throw new Error("Failed to fetch admission statistics");
  return response.json();
}

// In addAdmissionForm.js
export async function getMonthlyStatistics(year) {
  const response = await fetch(`${BASE_URL}/monthlyStatistics?year=${year}`);
  if (!response.ok) throw new Error("Failed to fetch monthly statistics");
  return response.json();
}
export async function getDailyStats() {
  const response = await fetch(`${BASE_URL}/getDailyStats`);
  if (!response.ok) throw new Error("Failed to fetch daily statistics");
  return response.json();
}