const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db;

if (process.env.NODE_ENV === "test") {
  db = new Client({
    connectionString: getDatabaseUri(),
    ssl: false
  });
} else {
  db = new Client({
    connectionString: getDatabaseUri(),
    ssl: {
      rejectUnauthorized: false
    }
  });
}

db.connect();

module.exports = db;