const express = require('express');
var cors = require('cors');
const PORT = process.env.PORT || 8081;
const path = require('path');
const app = express();
const verifyJWT = require('./middleware/jwtVerification');

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
app.use('/api/registration', require('./routers/registrationRoute'));
app.use('/api/authentication', require('./routers/authenticationRoute'));

app.use(verifyJWT);
app.use('/api/periods', require('./routers/recordsRoute'));

//custom error handler
app.use((error, request, response, next) => {
  console.error(error.stack);
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// app.listen(PORT, () => {
//   console.log(`Listening on ${PORT}`);
//   let options = {
//     port: PORT,
//     host: 'localhost',
//   };
//   let request = http.request(options);
//   request.setHeader(
//     'Authorization',
//     'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjEyNDU3NzcsImV4cCI6MTY2MTI0NTgzN30.pIUiOKRAkOrPofFnMeeejH81Th6GqQXVbJpPzdw3RY4'
//   );
//   request.end();
// });
