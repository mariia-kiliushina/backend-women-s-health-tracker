// const express = require('express');

const periodsData = [
  { id: 1, type: 'Had flows', date: '2022-08-10' },
  { id: 2, type: 'Meds', date: '2022-08-14' },
];

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

// create an express app
const express = require('express');
const app = express();

// use the express-static middleware
app.use(express.static('public'));

// define the first route
app.get('/', function (req, res) {
  res.send('<h1>Hello World!</h1>');
});
app.get('/api/periods', function (req, res) {
  res.send(periodsData);
});

// start the server listening for requests
app.listen(3000, () => console.log('Server is running...'));
