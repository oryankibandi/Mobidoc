const express = require("express");
const patientController = require("../controllers/patientController");

let router = express.Router();

router.route("/create").post(patientController.createPatientController);
router.route("/login").post(patientController.authenticatePatientController);
router.route("/:patient_uid").put(patientController.updatePatientController);
router.route("/refresh").get(patientController.refreshPatientController);
router.route("/logout").post(patientController.logOutPatientController);

module.exports = router;
