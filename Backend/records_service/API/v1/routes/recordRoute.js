const express = require("express");
const recordController = require("../controllers/recordController");

let router = express.Router();

router.route("/add").post(recordController.addRecordController);

module.exports = router;
