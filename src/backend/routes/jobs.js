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

module.exports = router;
