require("dotenv").config({ path: __dirname + "/.env" });

module.exports = Object.freeze({
  doctor: parseInt(process.env.DOCTOR),
  patient: parseInt(process.env.PATIENT),
});
