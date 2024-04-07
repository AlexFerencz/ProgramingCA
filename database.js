const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(function() {
  db.run("CREATE TABLE users (id INT PRIMARY KEY, name TEXT, email TEXT)");
  db.run("INSERT INTO users (id, name, email) VALUES (1, 'admin', 'admin')");
});

module.exports = db;