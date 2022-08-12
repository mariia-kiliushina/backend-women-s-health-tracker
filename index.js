// const express = require('express');

// const periodsData = [
//   { id: 1, type: 'Had flows', date: '2022-08-10' },
//   { id: 2, type: 'Meds', date: '2022-08-14' },
// ];

// const app = express();
// app.use(express.json());

// const port = 8081;

// app.get('/api/periods', function (req, res) {
//   res.json(periodsData);
// });

// app.post('/api/periods', (req, res) => {
//   periodsData.push(req.body);
//   res.json(req.body);
// });

// app.listen(port, function () {
//   console.log(`Listening to requests on http://localhost:${port}`);
// });

const express = require('express');
const { Pool, Client } = require('pg');
var cors = require('cors');
const PORT = process.env.PORT || 8081;

// const periodsData = [
//   { id: 1, type: 'Had flows', date: '2022-08-10' },
//   { id: 2, type: 'Meds', date: '2022-08-14' },
// ];

const client = new Client({
  user: 'markil',
  host: '172.18.0.3',
  database: 'women-health-db',
  password: 'rootbeer',
  port: 5432,
});

client.connect().then(() => {
  client.query('SELECT NOW()', (err, res) => {
    console.log(res.rows);
    client.end();
  });
});

// express()
//   .use(cors())
//   .use(express.json())
//   .get('/', (req, res) => res.send('<h1>Hello from backend</h1>'))
//   .get('/api/periods', (req, res) => res.send(periodsData))
//   .post('/api/periods', (req, res) => {
//     periodsData.push(req.body);
//     res.json(req.body);
//   })
//   .listen(PORT, () => console.log(`Listening on ${PORT}`));
