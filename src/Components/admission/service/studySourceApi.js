const BASE_URL = "http://localhost:8103";

export async function getAllStudySources() {
  const res = await fetch(`${BASE_URL}/getAllStudySources`);
  if (!res.ok) throw new Error("Failed to fetch Study Sources");
  return res.json();
}

export async function createStudySource(data) {
  const res = await fetch(`${BASE_URL}/createStudySource`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create Study Source");
  return res.json();
}

export async function deleteStudySource(id) {
  const res = await fetch(`${BASE_URL}/deleteStudySource/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete Study Source");
  return res.text();
}
