const express = require('express')
const cors = require('cors');
const app = express();
const SQL = require('./sql.js');

//const notes = new SQL()
//SQL.constructor();

SQL.openDB();

app.use(cors({
  origin: '*' //['http://localhost:3000','http://localhost:3001']
}));
const port = 3001
database = []

app.get('/getdatabase', (req, res) => {
  res.json(SQL.all())
})

app.get('/addnote/:note', (req, res) => {
  SQL.insert(req.params.note, "2020-08-09");
  const x = SQL.all()
  console.log(x)
  res.json(x)

  //database = [...database, req.params.note]
  //res.json(database)
})

app.get('/removeNote/:index', (req, res) => {
  //database.splice(req.params.index,1)
  //res.json(database)
  SQL.remove(req.params.index)
  console.log(SQL.all());

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
