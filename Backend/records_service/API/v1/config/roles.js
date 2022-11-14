require("dotenv").config({ path: __dirname + "/.env" });

module.exports = Object.freeze({
  doctor: process.env.DOCTOR,
  patient: process.env.PATIENT,
});
