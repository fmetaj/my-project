const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

// DB connection
const db = mysql.createConnection({
  host: "database-1.coraoy4mwq9z.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "Albania2026!",
  database: "mydb"
});

db.connect(err => {
  if (err) {
    console.log("DB error:", err);
  } else {
    console.log("Connected!");
  }
});

// Insert data
app.post("/add", (req, res) => {
  const { name } = req.body;

  db.query("INSERT INTO users (name) VALUES (?)",
    [name],
    (err, result) => {
      if (err) return res.send(err);
      res.send("Inserted!");
    });
});

// Get data
app.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.send(err);
    res.json(results);
  });
});

app.listen(3000, () => console.log("Running on 3000"));
