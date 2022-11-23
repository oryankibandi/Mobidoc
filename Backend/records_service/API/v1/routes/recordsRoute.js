const express = require("express");
const recordController = require("../controllers/recordController");

let router = express.Router();

router.route("/").get(recordController.getRecordsController);
router
  .route("/:patient_uid/:record_uid")
  .get(recordController.getRecordControler);

module.exports = router;
