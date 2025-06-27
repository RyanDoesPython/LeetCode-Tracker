const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://ryanglynn:Rg89758975@leetcodetracker.ribzxva.mongodb.net/?retryWrites=true&w=majority&appName=LeetCodeTracker";

const client = new MongoClient(uri);
const dbName = "leetcode";

async function connectDB() {
  if (!client.topology?.isConnected()) await client.connect();
  return client.db(dbName);
}

module.exports = { connectDB };