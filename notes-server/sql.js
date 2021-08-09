const sqlite3 = require('sqlite3').verbose();
const sqliteJson = require('sqlite-json');
//exporter = sqliteJson(db);

function openDB(){
  this.db = new sqlite3.Database('notes.db', (err) => {
    if (err) {
      console.log('Could not connect to database', err)
    } else {
      console.log('Connected to SQlite database')
    }
  });
  this.db.run('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, note TEXT, date DATE)', (err) => {
    if (err) {
      console.log('ERROR!', err)
    } else {
      console.log('No error creating table')
    }
  })
};


function insert(note, date) {
  return this.db.run(
    'INSERT INTO notes (note, date) VALUES (?, ?)',
    [note, date], function (err) {
      if (err) throw err; 
      console.log(`A row has been inserted with rowid ${this.lastID}`);
  })   
};


function remove(id){
  return this.db.run(
    'DELETE FROM notes WHERE id = ?',
    [id]
  )
}


function all() {
  //sqliteJson(this.db).json('SELECT * FROM notes ORDER BY id', function (err, json) {
  //  if (err) {
  //    console.log(err)
  //  } else {
  //    console.log(json)
  //  }
  //});
//}

  return this.db.all(
    `SELECT * FROM notes ORDER BY id`, (err, result) => {
      if (err) {
       console.log(err)
     } else {
        console.log(result)
    }
  })  
}


module.exports = {openDB, insert, remove, get, all};


function get(id) {
  return this.db.all(
    `SELECT * FROM tasks WHERE id = ?`,
      [id], 
      (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log(result)
    }
  })
};

