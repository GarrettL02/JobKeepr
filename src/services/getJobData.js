const API_URL = "http://localhost:5000";

export async function getAllJobsData() {
  try {
    const response = await fetch(`${API_URL}/jobs`);
    if (!response.ok) throw new Error("Failed to fetch jobs");

    const data = await response.json();

    // Map backend fields to frontend-friendly camelCase
    const mappedJobData = data.map((row) => ({
      job_id: row.job_id,
      jobNumber: row.jobNumber,
      customerName: row.customerName,
      customerLocation: row.customerLocation,
      status: row.status,
      rma: row.rma || "",
      tagNumber: row.tagNumber,
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

export async function getFilteredJobsDataByStatus(status) {
  try {
    const response = await fetch(`${API_URL}/jobs`);
    if (!response.ok) throw new Error("Failed to fetch jobs");

    const data = await response.json();

    // Map backend fields to frontend-friendly camelCase
    const mappedJobData = data.map((row) => ({
      job_id: row.job_id,
      jobNumber: row.jobNumber,
      customerName: row.customerName,
      customerLocation: row.customerLocation,
      status: row.status,
      rma: row.rma || "",
      tagNumber: row.tagNumber,
      purchaseOrder: row.purchaseOrder || "",
      priority: row.priority,
      difficulty: row.difficulty,
      assignedTo: row.assignedTo || "",
      createdDate: row.createdDate,
    }));

    const filteredJobData = mappedJobData.filter(
      (job) => job.status === status
    );

    return filteredJobData;
  } catch (err) {
    console.error("Fetch jobs error:", err);
    return [];
  }
}

export async function getJobData(jobNumber) {
  try {
    const response = await fetch(`${API_URL}/jobs`);
    if (!response.ok) throw new Error("Failed to fetch jobs");

    const data = await response.json();

    // Map backend fields to frontend-friendly camelCase
    const mappedJobData = data.map((row) => ({
      job_id: row.job_id,
      jobNumber: row.jobNumber,
      customerName: row.customerName,
      customerLocation: row.customerLocation,
      status: row.status,
      rma: row.rma || "",
      tagNumber: row.tagNumber,
      purchaseOrder: row.purchaseOrder || "",
      priority: row.priority,
      difficulty: row.difficulty,
      assignedTo: row.assignedTo || "",
      createdDate: row.createdDate,
    }));

    //chagne url param to number
    const jobNum = Number(jobNumber);

    const IndividualJobData = mappedJobData.find(
      (job) => job.jobNumber === jobNum
    );

    return IndividualJobData || null;
  } catch (err) {
    console.error("Fetch jobs error:", err);
    return [];
  }
}
