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

const addRecord = async (request, response) => {
  const { type, date } = request.body;
  client.query(
    `INSERT INTO ${tableName} (type, date) VALUES ($1,$2)`,
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
};

module.exports = { addRecord };
