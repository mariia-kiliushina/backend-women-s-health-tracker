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

const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('<h1>Hello from backend</h1>'));

app.use('/api/registration', require('./routers/registerRoute'));
app.use('/api/periods', require('./routers/getDataRoute'));

app.post('/api/periods', (request, response) => {
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
});
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
