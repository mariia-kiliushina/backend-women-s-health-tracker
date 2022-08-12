const { Client } = require('pg');
const client = new Client({
  user: 'markil',
  host: 'localhost',
  database: 'women-health-db',
  password: 'rootbeer',
  port: 5432,
});

client.connect();
client.query(`Select * from testdb`, (err, res) => {
  if (!err) {
    console.log(res.rows);
  } else {
    console.log(err.message);
  }
  client.end;
});
