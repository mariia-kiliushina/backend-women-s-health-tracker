const express = require('express');
const router = express.Router();
const addRecordController = require('../controllers/addRecord');

router.post('*', addRecordController.addRecord);

module.exports = router;
