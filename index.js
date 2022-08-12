const express = require('express');
var cors = require('cors');
const PORT = process.env.PORT || 8081;
//
const { Client } = require('pg');

const client = new Client({
  user: 'markil',
  host: 'localhost',
  database: 'women-health-db',
  password: 'rootbeer',
  port: 5432,
});

let tableName = 'periods_table';

let RESULT;

client.connect();
client.query(`Select * from ${tableName}`, (err, res) => {
  if (!err) {
    RESULT = res.rows;
    console.log(res.rows);
  } else {
    console.log(err.message);
  }
  client.end;
});

///

express()
  .use(cors())
  .use(express.json())
  .get('/', (req, res) => res.send('<h1>Hello from backend</h1>'))
  .get('/api/periods', (req, res) => res.send(RESULT))
  .post('/api/periods', (req, res) => {
    periodsData.push(req.body);
    res.json(req.body);
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
