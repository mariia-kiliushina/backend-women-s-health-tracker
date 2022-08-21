const express = require('express');
var cors = require('cors');
const PORT = process.env.PORT || 8081;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('<h1>Hello from backend</h1>'));

app.use('/api/registration', require('./routers/registerRoute'));
app.use('/api/periods', require('./routers/getRecordsRoute'));
app.use('/api/periods', require('./routers/addRecordRoute'));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
