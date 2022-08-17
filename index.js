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

let tableName = 'periods_table';

client.connect();

express()
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
  .post('/api/periods', (request, response) => {
    const { type, date } = request.body;
    client.query(
      `INSERT INTO ${tableName} ( type, date) VALUES ($1,$2)`,
      [type, date],
      (error, result) => {
        if (error) {
          throw error;
        }
        client.query(`SELECT * from ${tableName} ORDER BY id DESC LIMIT 1`, (error, result) => {
          if (error) {
            throw error;
          }
          response.json(result.rows);
        });
      }
    );
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
