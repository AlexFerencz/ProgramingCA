const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(function() {
  db.run("CREATE TABLE users (id INT, name TEXT, email TEXT)");
  db.run("INSERT INTO users (id, name, email) VALUES (1, 'John Doe', 'john@example.com')");
  db.run("INSERT INTO users (id, name, email) VALUES (2, 'Jane Doe', 'jane@example.com')");
});

module.exports = db;