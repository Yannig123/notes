const sqlite3 = require('sqlite3').verbose();

// open database file
let db = new sqlite3.Database('notes.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
  });


// close the database connection
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });