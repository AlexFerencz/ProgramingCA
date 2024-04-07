const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database.js');
const app = express();
const port = 3674;

app.use(bodyParser.json());

// Route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Simple Web App!');
});

app.post('/users', (req, res) => {
  let sql = `SELECT * FROM users WHERE email = '${req.query.email}'`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).send("Error fetching users");
      return;
    }
    res.json(rows);
  });
});