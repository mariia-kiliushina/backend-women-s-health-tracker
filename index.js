const express = require('express');
var cors = require('cors');
const PORT = process.env.PORT || 8081;
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middleware/jwtVerification');
// const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');

const corsOptions = {
  origin: 'https://rad-brigadeiros-220815.netlify.app',
  credentials: true,
};
// app.use(credentials);
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));

//API routes
app.use('/api/registration', require('./routers/registrationRoute'));
app.use('/api/authentication', require('./routers/authenticationRoute'));
app.use('/api/refresh', require('./routers/refreshTokenRoute'));
app.use('/api/logout', require('./routers/logoutRoute'));

app.use(verifyJWT);
app.use('/api/periods', require('./routers/recordsRoute'));

//custom error handler
app.use((error, request, response, next) => {
  console.error(error.stack);
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
