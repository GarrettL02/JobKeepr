const db = require("../server/db");

//Runs as soon as the server starts - ensures the if the table doesnt exist on startup, it is created
async function createItemTable() {
  await db.query(`
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";
    
    CREATE TABLE IF NOT EXISTS items (
      item_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      job_id UUID NOT NULL REFERENCES jobs(job_id) ON DELETE CASCADE,
      "itemTitle" TEXT NOT NULL,
      sn INT,
      description TEXT
    );`);
}

module.exports = {
  createItemTable,
};
