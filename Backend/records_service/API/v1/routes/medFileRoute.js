const express = require("express");
const recordController = require("../controllers/recordController");

let router = express.Router();

router.route("/request").post(recordController.requestAccessController);
router.route("/requests").get(recordController.getRequestsController);
router.route("/grant").post(recordController.grantAccessController);

module.exports = router;
