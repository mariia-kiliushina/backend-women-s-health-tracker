const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authentication');

router.post('/', authenticationController.handleLogin);

module.exports = router;
