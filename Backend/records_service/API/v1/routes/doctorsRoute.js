const express = require("express");
const doctorController = require("../controllers/doctorController");

let router = express.Router();

router.route("/").get(doctorController.getDoctors);
router.route("/:doctor_uid").get(doctorController.getDoctorController);
router.route("/:doctor_uid").put(doctorController.updateDoctorController);

module.exports = router;
