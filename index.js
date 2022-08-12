const express = require('express');
var cors = require('cors');
const PORT = process.env.PORT || 8081;
const restAPIs = require('./restAPI');
//
// const { Client } = require('pg');

// const client = new Client({
//   user: 'markil',
//   host: 'localhost',
//   database: 'women-health-db',
//   password: 'rootbeer',
//   port: 5432,
// });

// client.connect();

// let tableName = 'periods_table';

// let GETRESULT;
// let POSTRESULT;

// const getDBdata = (request, response) => {
//   client.query(
//     (`Select * from ${tableName}`,
//     (err, res) => {
//       if (err) {
//         throw error;
//       }
//       response.status(200).json(res.rows);
//     })
//   );
// };

const app = express();

app
  .use(cors())
  .use(express.json())
  .get('/', (req, res) => res.send('<h1>Hello from backend</h1>'))
  .get('/api/periods', restAPIs.getDBdata)
  // .get('/api/users/:id', restAPIs.getUserById)
  .post('/api/periods', restAPIs.postDBdata)

  .listen(PORT, () => console.log(`Listening on ${PORT}`));

// const insertData = async (data) => {
//   try {
//     await client.connect(); // gets connection
//     await client.query(
//       `INSERT INTO periods_table ("name", "role")
//              VALUES ($1, $2)`,
//       [userName, userRole]
//     ); // sends queries
//     return true;
//   } catch (error) {
//     console.error(error.stack);
//     return false;
//   } finally {
//     await client.end(); // closes connection
//   }
// };
