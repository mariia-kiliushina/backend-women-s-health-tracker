const express = require('express');
const router = express.Router();
const getDataController = require('../controllers/getData');

router.get('*', getDataController.getData);

module.exports = router;
