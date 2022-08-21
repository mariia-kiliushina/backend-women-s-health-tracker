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

client.connect();

let tableName = 'periods_table';

const getRecords = (request, response) => {
  client.query(`Select * from ${tableName}`, (error, result) => {
    if (error) {
      throw error;
    }
    response.json(result.rows);
  });
};

module.exports = { getRecords };
