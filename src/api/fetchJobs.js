const API_URL = "http://localhost:5000";

export async function fetchJobs() {
  try {
    const response = await fetch(`${API_URL}/jobs`);
    if (!response.ok) throw new Error("Failed to fetch jobs");

    const data = await response.json();
    console.log("Raw backend data:", data);

    // Map backend fields to frontend-friendly camelCase
    const mappedJobData = data.map((row) => ({
      job_id: row.job_id,
      customerName: row.customerName,
      customerLocation: row.customerLocation,
      status: row.status,
      rma: row.rma || "",
      purchaseOrder: row.purchaseOrder || "",
      priority: row.priority,
      difficulty: row.difficulty,
      assignedTo: row.assignedTo || "",
      createdDate: row.createdDate,
    }));

    return mappedJobData;
  } catch (err) {
    console.error("Fetch jobs error:", err);
    return [];
  }
}
