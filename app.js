const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database.js');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/users', (req, res) => {
  let sql = `SELECT * FROM users WHERE email = '${req.query.email}'`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).send("Error fetching users");
      return;
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});