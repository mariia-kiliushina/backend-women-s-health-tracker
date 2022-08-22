const express = require('express');
var cors = require('cors');
const PORT = process.env.PORT || 8081;
const path = require('path');
const { response } = require('express');

const app = express();

const whiteList = [
  'http://localhost:8081',
  'http://localhost:8080',
  'https://women-health-backend.herokuapp.com',
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSucessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));

//API routes
app.use('/api/periods', require('./routers/recordsRoute'));
app.use('/api/registration', require('./routers/registrationRoute'));
app.use('/api/authentication', require('./routers/authenticationRoute'));

//custom error handler
app.use((error, request, response, next) => {
  console.error(error.stack);
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
