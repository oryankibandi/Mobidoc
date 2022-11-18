const express = require("express");
const doctorController = require("../controllers/doctorController");

let router = express.Router();

router.route("/").get(doctorController.getDoctorsController);
router.route("/:doctor_uid").get(doctorController.getDoctorController);

module.exports = router;
