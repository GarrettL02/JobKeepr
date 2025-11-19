//Anywhere that imports db can run SQL commands to backend

console.log("DATABASE_URL:", process.env.DATABASE_URL);

//Creats  a Postgres connection pool
const { Pool } = require("pg");
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

//Makes one shared conenction to the database that can be used in the entities file
module.exports = {
  query: (text, params) => db.query(text, params),
};
