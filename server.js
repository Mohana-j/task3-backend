// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 8001;
const cors = require('cors');
app.use(cors());

// Middleware to parse JSON data
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mona1025!', // Your MySQL password
  database: 'students', // Your database name
});

// Connect to MySQL database
db.connect((err) => {
  if (err) {
    console.error('Could not connect to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Endpoint to add marks to the database
app.post('/add-marks', (req, res) => {
  const { sub1, sub2, sub3, sub4, sub5 } = req.body;
  console.log(req.body)
  // SQL query to insert marks into the table
  const query = 'INSERT INTO marks (sub1, sub2, sub3, sub4, sub5) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [sub1, sub2, sub3, sub4, sub5], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error inserting marks' });
    }
    res.status(200).json({ message: 'Marks added successfully' });
  });
});

// Endpoint to fetch all marks from the database
app.get('/fetch-marks', (req, res) => {
  db.query('SELECT * FROM marks', (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching marks' });
    }
    res.status(200).json({ marks: result });
  });
});


app.delete("/delete-mark/:id", (req, res) => {
  const id = req.params.id;
  console.log("Deleting mark with ID:", id);
  const query = `DELETE FROM marks WHERE id = ?`;

  db.query(query, [id], (err, results) => {
      if (err) {
          console.log(err);
          return res.status(500).json({ error: "Failed to delete mark" });
      }
      res.status(200).json({ message: "Mark deleted successfully" });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
