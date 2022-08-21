const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/register');

router.post('*', registrationController.handleNewUser);
// router.get('*', registrationController.handleNewUser);

module.exports = router;
