// const BASE_URL = "http://localhost:8103";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function getAllSeatTypes() {
  const res = await fetch(`${BASE_URL}/getAllSeatTypes`);
  if (!res.ok) throw new Error("Failed to fetch Seat Types");
  return res.json();
}

export async function createSeatType(data) {
  const res = await fetch(`${BASE_URL}/createSeatType`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create Seat Type");
  return res.json();
}

export async function deleteSeatType(id) {
  const res = await fetch(`${BASE_URL}/deleteSeatType/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete Seat Type");
  return res.text();
}
