const API_URL = "http://localhost:5000";

function mapJobData(row) {
  return {
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
  };
}

//GET all job data
export async function getAllJobsData() {
  try {
    const response = await fetch(`${API_URL}/jobs`);
    if (!response.ok) throw new Error("Failed to fetch jobs");

    const data = await response.json();

    return data.map(mapJobData);
  } catch (err) {
    console.error("Fetch jobs error:", err);
    return [];
  }
}

//GET filtered job data by status
export async function getFilteredJobsDataByStatus(status) {
  try {
    const response = await fetch(`${API_URL}/jobs`);
    if (!response.ok) throw new Error("Failed to fetch jobs");

    const data = await getAllJobsData();

    const filteredJobData = data.filter((job) => job.status === status);

    return filteredJobData;
  } catch (err) {
    console.error("Fetch jobs error:", err);
    return [];
  }
}

//GET specific job data
export async function getJobData(jobNumber) {
  try {
    const response = await fetch(`${API_URL}/jobs`);
    if (!response.ok) throw new Error("Failed to fetch jobs");

    const data = await getAllJobsData();

    //chagne url param to number
    const jobNum = Number(jobNumber);

    const IndividualJobData = data.find((job) => job.jobNumber === jobNum);

    return IndividualJobData || null;
  } catch (err) {
    console.error("Fetch jobs error:", err);
    return [];
  }
}

//PATCH update job
export async function updateJob(jobId, updates) {
  try {
    const response = await fetch(`${API_URL}/jobs/id/${jobId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!response.ok) throw new Error("Failed to update job");

    return await response.json();
  } catch (err) {
    console.error("Update job error:", err);
    throw err;
  }
}
