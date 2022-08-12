const { Client } = require('pg');

const client = new Client({
  user: 'markil',
  host: 'localhost',
  database: 'women-health-db',
  password: 'rootbeer',
  port: 5432,
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
