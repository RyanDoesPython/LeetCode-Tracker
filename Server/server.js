const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");


const app = express();

app.use(cors()); // 👈 allow all origins
app.use(express.json());

const PORT = process.env.PORT || 3000;



app.use(express.json());

app.post("/api/add-card", async (req, res) => {
  const card = req.body;

  try {
    const db = await connectDB();
    await db.collection("cards").insertOne(card);
    res.status(201).json({ message: "Card saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save card" });
  }
});

app.delete("/api/cards/:id", async (req, res) => {
  const idToDelete = req.params.id;
  console.log("DELETE request received for:", idToDelete);

  try {
    const db = await connectDB();
    const result = await db.collection("cards").deleteOne({ problemNumber: idToDelete });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Card deleted successfully" });
    } else {
      res.status(404).json({ message: "Card not found" });
    }
  } catch (error) {
    console.error("Error deleting card:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.get("/api/cards", async (req, res) => {
  try {
    const db = await connectDB();
    const cards = await db.collection("cards").find({}).toArray();
    res.json(cards);
  } catch (err) {
    console.error("Error in /api/cards:", err);  // 👈 log full error
    res.status(500).json({ error: "Failed to load cards" });
  }
});


app.listen(PORT, () => {
  console.log(`✅ Server running at ${PORT}`);
});
