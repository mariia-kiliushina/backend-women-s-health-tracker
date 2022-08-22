const express = require('express');
const router = express.Router();
const recordsController = require('../controllers/records');

router.route('/').get(recordsController.getRecords).post(recordsController.postRecord);

router.route('/:id').get(recordsController.getRecordsById).patch(recordsController.patchRecordById);

module.exports = router;
