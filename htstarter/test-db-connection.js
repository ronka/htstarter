require("dotenv").config();
const { testConnection } = require("./db/index");

async function test() {
  console.log("Testing database connection...");
  console.log("DATABASE_URL:", process.env.DATABASE_URL ? "Set" : "Not set");

  try {
    const result = await testConnection();
    console.log("Connection result:", result);
  } catch (error) {
    console.error("Connection failed:", error.message);
  }
}

test();
