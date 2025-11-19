//main entry point for the server

//reads the .env file and makes its variables visible
require("dotenv").config();

//The backend HTTP server
const express = require("express");
const app = express();

const cors = require("cors");
const db = require("./db");
const { createJobTable } = require("../entities/Job");
const { createItemTable } = require("../entities/Item");
const { createItemImageTable } = require("../entities/ItemImage");

async function createAllTables() {
  try {
    await createJobTable();
    console.log("Jobs table check complete!");

    await createItemTable();
    console.log("Items table check complete!");

    await createItemImageTable();
    console.log("ItemImages table check complete!");
  } catch (err) {
    console.error("Error creating tables:", err);
  }
}

//Runs function to create all tables in order
createAllTables();

//Cors lets React call the backend - lets backend read json requests
app.use(express.json());
app.use(cors());
// Simple test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Front end request
app.get("/jobs", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM jobs");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Front end request
app.get("/items", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM items");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/itemImage", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM itemImage");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: "Server error" });
  }
});

//creates Port for backend, makes avaliable at localhost:5000 or specified in .env file

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
