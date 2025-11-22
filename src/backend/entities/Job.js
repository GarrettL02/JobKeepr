const db = require("../server/db");

// //or frontend and Type Safety
// export interface Job {
//   job_id?: number; // optional because it will be assigned by DB
//   customerName: string;
//   customerLocation: string;
//   rma?: string;
//   sn?: string;
//   t?: string;
//   purchaseOrder: string;
//   status: string;
//   priority: number;
//   difficulty: number;
//   assignedTo?: string;
//   createdDate?: string; // ISO date string
// }
//Runs as soon as the server starts - ensures the if the table doesnt exist on startup, it is created
async function createJobTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS jobs (
      job_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      "jobNumber" SERIAL,
      "customerName" TEXT NOT NULL,
      "customerLocation" TEXT NOT NULL,
      rma TEXT,
      "tagNumber" TEXT,
      "purchaseOrder" TEXT,
      status TEXT NOT NULL,
      priority INT NOT NULL,
      difficulty INT NOT NULL,
      "assignedTo" TEXT,
      "createdDate" TIMESTAMP DEFAULT NOW()
    );`);
}

module.exports = {
  createJobTable,
};
