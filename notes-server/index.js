const express = require('express')
const cors = require('cors');
const app = express()
app.use(cors({
  origin: '*' //['http://localhost:3000','http://localhost:3001']
}));
const port = 3001
database = []

app.get('/getdatabase', (req, res) => {
  res.json(database)
})

app.get('/addnote/:note', (req, res) => {
  console.log(req.params.note);
  database = [...database, req.params.note]
  res.json(database)
})

app.get('/removeNote/:index', (req, res) => {
  database.splice(req.params.index,1)
  res.json(database)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
