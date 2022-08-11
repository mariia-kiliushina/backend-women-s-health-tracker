const express = require('express');
const periods = require('./periodsData');

const app = express();
app.use(express.json());

const port = 8081;

app.get('/api/periods', function (req, res) {
  res.json(periods);
});

app.post('/api/periods', (req, res) => {
  res.json(req.body);
});

app.listen(port, function () {
  console.log(`Listening to requests on http://localhost:${port}`);
});
