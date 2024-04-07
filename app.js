const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database.js');
const app = express();
const port = 3674;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the login page for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// ... existing routes ...

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

// Route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Simple Web App!');
});

app.post('/users', (req, res) => {
  let sql = `SELECT * FROM users WHERE email = '${req.query.email}'`;
  db.get(sql, [email], (err, row) => {
      if (err) {
        res.status(400).send("Error logging in");
        console.error(err.message);
        return;
      }
      if (row) {
        // In a real application, you would securely check the password here
        res.send(`Welcome, ${row.name}!`);
      } else {
        res.send("User not found");
      }
  });
});