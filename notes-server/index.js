const express = require('express')
const cors = require('cors');
const app = express();
const SQL = require('./sql.js');

SQL.openDB();

app.use(cors({
  origin: '*' //['http://localhost:3000','http://localhost:3001']
}));
const port = 3001
database = []

app.get('/getdatabase', async (req, res) => {
  const x = await SQL.all();
  res.json(x);
})


app.get('/addnote/:note', async (req, res) => {
var today = new Date();
var date;
date = today.getFullYear() + '-'
             + ('0' + (today.getMonth()+1)).slice(-2) + '-'
             + ('0' + today.getDate()).slice(-2);

  SQL.insert(req.params.note, date);
  const x = await SQL.all();
  res.json(x);
})

app.get('/removeNote/:id', async (req, res) => {
  console.log(req.params.id)
  SQL.remove(req.params.id);
  const x = await SQL.all();
  res.json(x);
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
