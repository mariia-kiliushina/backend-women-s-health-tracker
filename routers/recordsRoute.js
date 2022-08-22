const express = require('express');
const router = express.Router();
const getRecordsController = require('../controllers/getRecords');
const addRecordController = require('../controllers/addRecord');

router.route('/').get(getRecordsController.getRecords).post(addRecordController.postRecord);

router
  .route('/:id')
  .get(getRecordsController.getRecordsById)
  .patch(addRecordController.patchRecordById);

module.exports = router;
