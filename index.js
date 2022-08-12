const express = require('express');
var cors = require('cors');
const expressPORT = 8081;
const restAPIs = require('./restAPI');
const { config } = require('dotenv');

config();

const app = express();

app
  .use(cors())
  .use(express.json())
  .get('/', (req, res) => res.send('<h1>Hello from backend</h1>'))
  .get('/api/periods', restAPIs.getDBdata)
  .post('/api/periods', restAPIs.postDBdata)
  .listen(expressPORT, () => console.log(`Listening on ${expressPORT}`));
// .get('/api/users/:id', restAPIs.getUserById)
