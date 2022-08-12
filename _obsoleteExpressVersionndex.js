const express = require('express');
var cors = require('cors');
const PORT = process.env.PORT || 8081;

const periodsData = [
  { id: 1, type: 'Had flows', date: '2022-08-10' },
  { id: 2, type: 'Meds', date: '2022-08-14' },
];

express()
  .use(cors())
  .use(express.json())
  .get('/', (req, res) => res.send('<h1>Hello from backend</h1>'))
  .get('/api/periods', (req, res) => res.send(periodsData))
  .post('/api/periods', (req, res) => {
    periodsData.push(req.body);
    res.json(req.body);
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
