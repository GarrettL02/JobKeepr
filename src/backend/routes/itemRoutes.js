const express = require("express");
const router = express.Router();
const db = require("../server/db");

router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM items");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching items:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
