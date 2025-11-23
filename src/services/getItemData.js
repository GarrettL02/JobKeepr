const API_URL = "http://localhost:5000";

function mappItemData(row) {
  return {
    item_id: row.item_id,
    job_id: row.job_id,
    title: row.title,
    sn: row.sn || "",
    t: row.t || "",
    description: row.description || "",
  };
}

export async function getItemData(jobId) {
  try {
    const response = await fetch(`${API_URL}/items`);
    if (!response.ok) throw new Error("Failed to fetch jobs");

    const data = await response.json();

    return data.map(mappItemData).filter((item) => item.job_id === jobId);
  } catch (err) {
    console.error("Fetch items error:", err);
    return [];
  }
}
