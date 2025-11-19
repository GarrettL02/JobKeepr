const db = require("../server/db");

//Runs as soon as the server starts - ensures the if the table doesnt exist on startup, it is created
async function createItemImageTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS itemImage (
      image_id SERIAL PRIMARY KEY,
      item_id INT NOT NULL REFERENCES items(item_id) ON DELETE CASCADE,
      image_url TEXT NOT NULL
    );`);
}

module.exports = {
  createItemImageTable,
};
