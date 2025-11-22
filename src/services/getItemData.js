const API_URL = "http://localhost:5000";

export async function getItemData(jobId) {
  try {
    const response = await fetch(`${API_URL}/items`);
    if (!response.ok) throw new Error("Failed to fetch jobs");

    const data = await response.json();

    // Map backend fields to frontend-friendly camelCase
    const mappedItemData = data.map((row) => ({
      item_id: row.item_id,
      job_id: row.job_id,
      sn: row.sn || "",
      t: row.t || "",
      description: row.description || "",
    }));

    const itemData = mappedItemData.filter((item) => item.job_id === jobId);

    return mappedItemData;
  } catch (err) {
    console.error("Fetch items error:", err);
    return [];
  }
}
