const express = require('express');

const periodsData = [
  { id: 1, type: 'Had flows', date: '2022-08-10' },
  { id: 2, type: 'Meds', date: '2022-08-14' },
];

const app = express();
app.use(express.json());

const port = 8081;

app.get('/api/periods', function (req, res) {
  res.json(periodsData);
});

app.post('/api/periods', (req, res) => {
  periodsData.push(req.body);
  res.json(req.body);
});

app.listen(port, function () {
  console.log(`Listening to requests on http://localhost:${port}`);
});
