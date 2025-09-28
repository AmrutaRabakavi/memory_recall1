const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Important to parse JSON

const db = new sqlite3.Database("transcribe.db", (err) => {
  if (err) console.error("DB Error:", err);
  else console.log("Connected to SQLite DB");
});

// Cognitive Test POST API
app.post("/api/cognitive-test", (req, res) => {
  const { user_name, user_email, score } = req.body;

  if (!user_name || !user_email || score === undefined) {
    return res.status(400).json({ message: "Missing fields" });
  }

  db.run(
    `INSERT INTO cognitive_tests (user_name, user_email, score) VALUES (?, ?, ?)`,
    [user_name, user_email, score],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "DB insert error" });
      }
      res.json({ message: "Result saved successfully!", id: this.lastID });
    }
  );
});

// Get all cognitive tests (optional)
app.get("/api/cognitive-test", (req, res) => {
  db.all(`SELECT * FROM cognitive_tests ORDER BY created_at DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ message: "DB fetch error" });
    res.json(rows);
  });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
