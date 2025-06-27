const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI; // Set this in Render's Environment tab
const dbName = "leetcode";

let cachedClient = null;

async function connectDB() {
  if (cachedClient && cachedClient.topology?.isConnected?.()) {
    return cachedClient.db(dbName);
  }

  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
    });

    await client.connect();
    cachedClient = client;
    console.log("✅ Connected to MongoDB");
    return client.db(dbName);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}

module.exports = { connectDB };
