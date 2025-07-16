const BASE_URL = "http://localhost:8103";

export async function getAllStudyConducts() {
  const res = await fetch(`${BASE_URL}/getAllStudyConducts`);
  if (!res.ok) throw new Error("Failed to fetch Study Conducts");
  return res.json();
}

export async function createStudyConduct(data) {
  const res = await fetch(`${BASE_URL}/createStudyConduct`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create Study Conduct");
  return res.json();
}

export async function deleteStudyConduct(id) {
  const res = await fetch(`${BASE_URL}/deleteStudyConduct/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete Study Conduct");
  return res.text();
}
