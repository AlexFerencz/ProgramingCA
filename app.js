const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database.js');
const app = express();
const port = 3673;

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

// Route for adding a new user
//Replaced the inputs with different placeholders, in my case ?,?,?
// Handle login form submission
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM users WHERE email = ?`;

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
