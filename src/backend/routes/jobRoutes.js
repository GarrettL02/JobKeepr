const express = require("express");
const router = express.Router();
const db = require("../server/db");

// GET /jobs
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM jobs");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// PATCH /jobs/:jobNumber
router.patch("/id/:jobId", async (req, res) => {
  const { jobId } = req.params;
  const updates = req.body;

  try {
    const fields = Object.keys(updates);
    const values = Object.values(updates);

    if (fields.length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const setClause = fields
      .map((field, i) => `"${field}" = $${i + 1}`)
      .join(", ");

    const query = `
      UPDATE jobs
      SET ${setClause}
      WHERE job_id = $${fields.length + 1}
      RETURNING *;
    `;

    const result = await db.query(query, [...values, jobId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("PATCH job error:", err);
    res.status(500).json({ message: "Failed to update job" });
  }
});

// POST /jobs
router.post("/", async (req, res) => {
  try {
    const {
      customerName,
      customerLocation,
      rma,
      tagNumber,
      description,
      priority,
      difficulty,
      items,
    } = req.body;

    // Insert job (DB generates job_id automatically)
    const jobResult = await db.query(
      `INSERT INTO jobs ("customerName", "customerLocation", rma, "tagNumber", description, status, priority, difficulty)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        customerName,
        customerLocation,
        rma,
        tagNumber,
        description,
        "incoming",
        priority,
        difficulty,
      ]
    );

    const job = jobResult.rows[0];

    // Insert items if any
    if (items && items.length > 0) {
      for (const item of items) {
        await db.query(
          `INSERT INTO items (job_id, "itemTitle", sn)
           VALUES ($1, $2, $3)`,
          [job.job_id, item.name, item.sn]
        );
      }
    }

    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create job" });
  }
});
module.exports = router;
