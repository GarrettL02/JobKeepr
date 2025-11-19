const db = require("../server/db");

//Runs as soon as the server starts - ensures the if the table doesnt exist on startup, it is created
async function createItemTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS items (
      item_id SERIAL PRIMARY KEY,
      job_id INT NOT NULL REFERENCES jobs(job_id) ON DELETE CASCADE,
      sn INT,
      t INT,
      description TEXT
    );`);
}

module.exports = {
  createItemTable,
};
