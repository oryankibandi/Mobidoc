const express = require("express");
const doctorController = require("../controllers/doctorController");

let router = express.Router();

router.route("/create").post(doctorController.createDoctorController);
router.route("/login").post(doctorController.authenticateDoctorController);
router.route("/refresh").get(doctorController.refreshDoctorController);
router.route("/logout").post(doctorController.logOutDoctorController);

module.exports = router;
