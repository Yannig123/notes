const sqlite3 = require('sqlite3').verbose();
const Promise = require('bluebird');

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
};

function all() {
  const promise = new Promise((resolve, reject) => {
    return this.db.all('SELECT * FROM notes ORDER BY id', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
  return promise;
};


module.exports = {openDB, insert, remove, all};






/*
function selectNote(filter) {
  filter = '#' + filter;
  const promise = new Promise((resolve, reject) => {
    return this.db.all('SELECT * FROM notes WHERE instr(note, ?) > 0 ORDER BY id', [filter], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
  return promise;
};

function selectDate(filter) {
  const promise = new Promise((resolve, reject) => {
    return this.db.all('SELECT * FROM notes WHERE instr(date, ?) > 0 ORDER BY id', [filter], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
  return promise;
};

function get(id) {
  const promise = new Promise((resolve, reject) => {
    return this.db.all(`SELECT * FROM notes WHERE id = ?`, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
  return promise;
};

*/