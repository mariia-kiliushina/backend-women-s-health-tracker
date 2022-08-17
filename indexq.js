const express = require('express');
var cors = require('cors');
const PORT = process.env.PORT || 8081;

const { Client } = require('pg');
const { config } = require('dotenv');

config();

const client = new Client({
  database: process.env.DATABASE,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  port: 5432,
  user: process.env.USER_NAME,
});

const periodsData = [{ id: 1, type: 'Had flows', date: '2022-08-10' }];

let tableName = 'periods_table';

client.connect();

const getDBdata = (request, response) => {
  client.query(`Select * from ${tableName}`, (error, result) => {
    if (error) {
      throw error;
    }
    response.json(result.rows);
  });
};
let r = express()
  .use(cors())
  .use(express.json())
  .get('/', (req, res) => res.send('<h1>Hello from backend</h1>'))
  .get('/api/periods', (request, response) => {
    client.query(`Select * from ${tableName}`, (error, result) => {
      if (error) {
        throw error;
      }
      response.json(result.rows);
    });
  })
  .post('/api/periods', (req, res) => {
    periodsData.push(req.body);
    res.json(req.body);
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
