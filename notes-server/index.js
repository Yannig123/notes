const express = require('express')
const router = express.Router();
const cors = require('cors');
const app = express();
const SQL = require('./sql.js');

SQL.openDB();

app.use(cors({
  origin: '*' //['http://localhost:3000','http://localhost:3001']
}));
const port = 3001

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router.post('/addnote', async (req,res) => {
  var note = req.body.note;
  //var password = req.body.password;
  console.log(note);

  var today = new Date();
  var date;
  date = today.getFullYear() + '-'
              + ('0' + (today.getMonth()+1)).slice(-2) + '-'
              + ('0' + today.getDate()).slice(-2);

  console.log(date);

  SQL.insert(note, date);
  const x = await SQL.all()
  res.json(x);
});


  
  // add router in the Express app.
  app.use("/", router);



app.get('/getdatabase', async (req, res) => {
  const x = await SQL.all();
  res.json(x);
})

/*
app.get('/addnote/:note', async (req, res) => {
//get date YYYY-MM-DD
var today = new Date();
var date;
date = today.getFullYear() + '-'
             + ('0' + (today.getMonth()+1)).slice(-2) + '-'
             + ('0' + today.getDate()).slice(-2);

  SQL.insert(req.params.note, date);
  const x = await SQL.all()
  res.json(x);
})
*/

app.get('/removeNote/:id', async (req, res) => {
  console.log(req.params.id)
  SQL.remove(req.params.id);
  const x = await SQL.all();
  res.json(x);
})


app.get('/filter/:filter', async (req, res) => {
  console.log(req.params.filter)
  var x = []
  if ((req.params.filter) != null) {
    x = await SQL.selectNote(req.params.filter);
  }
  else {
    x = await SQL.all();
  }
   res.json(x);
})


app.get('/filterDate/:date', async (req, res) => {
  console.log(req.params.date)
  const x = await SQL.selectDate(req.params.date);
  res.json(x);
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})