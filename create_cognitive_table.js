const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("transcribe.db", (err) => {
  if (err) console.error("DB open error:", err.message);
  else console.log("Connected to DB");
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS cognitive_tests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_name TEXT NOT NULL,
      user_email TEXT NOT NULL,
      score REAL NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error("Error creating table:", err.message);
    else console.log("cognitive_tests table created successfully!");
  });
});

db.close();
