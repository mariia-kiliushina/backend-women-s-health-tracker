const { Client } = require('pg');
const { config } = require('dotenv');

config();

const client = new Client({
  user: process.env.USER_NAME,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: parseInt(process.env.PORT),
});

client.connect();

let tableName = 'periods_table';

const getDBdata = (request, response) => {
  client.query(`Select * from ${tableName}`, (error, result) => {
    if (error) {
      throw error;
    }
    response.status(200).json(result.rows);
  });
};

const postDBdata = (request, response) => {
  const { id, type, date } = request.body;
  client.query(
    `INSERT INTO ${tableName} (id, type, date) VALUES ($1,$2,$3)`,
    [id, type, date],
    (error, result) => {
      if (error) {
        throw error;
      }
    }
  );
  response.status(200).json(request.body);
};

module.exports = { getDBdata, postDBdata };
