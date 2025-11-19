const API_URL = "http://localhost:5000";

export async function fetchItems() {
  try {
    const response = await fetch(`${API_URL}/items`);
    if (!response.ok) throw new Error("Failed to fetch jobs");

    const data = await response.json();
    console.log("Raw backend data:", data);

    // Map backend fields to frontend-friendly camelCase
    const mappedJobData = data.map((row) => ({
      item_id: row.item_id,
      job_id: row.job_id,
      sn: row.sn || "",
      t: row.t || "",
      description: row.description || "",
    }));

    return mappedJobData;
  } catch (err) {
    console.error("Fetch jobs error:", err);
    return [];
  }
}
