const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Load cards from file if it exists
let cards = [];
const dataFile = "cards.json";

if (fs.existsSync(dataFile)) {
  const raw = fs.readFileSync(dataFile);
  try {
    cards = JSON.parse(raw);
  } catch (err) {
    console.error("Error parsing cards.json:", err);
  }
}

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post("/api/add-card", (req, res) => {
  const card = req.body;

  // Check if the card already exists (based on unique URL)
  const alreadyExists = cards.some(existingCard => existingCard.url === card.url);

  if (!alreadyExists) {
    console.log(card); // Only log if it's new
    cards.push(card);
    fs.writeFileSync(dataFile, JSON.stringify(cards, null, 2));
    res.status(201).json({ message: "Card saved successfully" });
  } else {
    res.status(200).json({ message: "Card already exists, skipping." });
  }
});

app.delete("/api/cards/:id", (req, res) => {
  const idToDelete = req.params.id;
  console.log("DELETE request received for:", req.params.id);

  // Check if card exists
  const index = cards.findIndex(card => String(card.problemNumber) === String(idToDelete));

  if (index !== -1) {
    // Remove card from array
    const deletedCard = cards.splice(index, 1)[0];

    // Save updated array to file
    fs.writeFileSync(dataFile, JSON.stringify(cards, null, 2));

    res.status(200).json({ message: "Card deleted successfully", deleted: deletedCard });
  } else {
    res.status(404).json({ message: "Card not found" });
  }
});

app.get("/api/cards", (req, res) => {
  res.json(cards);
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
