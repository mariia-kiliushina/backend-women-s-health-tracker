const express = require('express');
const router = express.Router();
const getRecordsController = require('../controllers/getRecords');

router.get('*', getRecordsController.getRecords);

module.exports = router;
