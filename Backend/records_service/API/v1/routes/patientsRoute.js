const express = require("express");
const patientController = require("../controllers/patientController");

let router = express.Router();

router.route("/").get(patientController.getPatientsController);
router.route("/:patient_uid").get(patientController.getPatientController);

module.exports = router;
