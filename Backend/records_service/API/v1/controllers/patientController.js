require("dotenv").config();
const patientUserCaseInterface = require("../use_cases/patient/patientUseCaseInterface");
const Cryptography = require("../helpers/cryptography");
const DB = require("../DB/mongoDB/mongoDBInterface");
const JWT = require("../helpers/jwt");
const PatientModel = require("../DB/mongoDB/schema/patientsSchema");
const RecordModel = require("../DB/mongoDB/schema/medicalRecordsSchema");
const roles = require("../config/roles");

const createPatientController = async (req, res) => {
  const patientDetails = req.body;

  if (!patientDetails.first_name) {
    res.status(400).json({
      status: "ERROR",
      message: "first_name not provided",
    });
  }
  if (!patientDetails.last_name) {
    res.status(400).json({
      status: "ERROR",
      message: "last_name not provided",
    });
  }
  if (!patientDetails.middle_name) {
    res.status(400).json({
      status: "ERROR",
      message: "middle_name not provided",
    });
  }
  if (!patientDetails.national_id) {
    res.status(400).json({
      status: "ERROR",
      message: "national_id not provided",
    });
  }
  if (!patientDetails.email) {
    res.status(400).json({
      status: "ERROR",
      message: "email not provided",
    });
  }
  if (!patientDetails.phone_number) {
    res.status(400).json({
      status: "ERROR",
      message: "phone_number not provided",
    });
  }
  if (!patientDetails.address) {
    res.status(400).json({
      status: "ERROR",
      message: "address not provided",
    });
  }
  if (!patientDetails.next_of_kin) {
    res.status(400).json({
      status: "ERROR",
      message: "next_of_kin not provided",
    });
  }
  if (!patientDetails.password) {
    res.status(400).json({
      status: "ERROR",
      message: "password not provided",
    });
  }

  try {
    const dbInstance = new DB();
    const cryptographyInstance = new Cryptography();
    const new_patient = await patientUserCaseInterface.createPatient(
      cryptographyInstance,
      dbInstance,
      PatientModel,
      RecordModel,
      roles,
      patientDetails
    );

    res.status(200).json({
      status: "SUCCESS",
      data: new_patient,
    });
  } catch (error) {
    res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

const authenticatePatientController = async (req, res) => {
  const credentials = req.body;

  if (!credentials.phone_number) {
    res.status(400).json({
      status: "ERROR",
      message: "phone_number not provided",
    });
  }
  if (!credentials.password) {
    res.status(400).json({
      status: "ERROR",
      message: "password not provided",
    });
  }

  try {
    const dbInstance = new DB();
    const cryptographyInstance = new Cryptography();
    const jwtInstance = new JWT();

    const data = await patientUserCaseInterface.authenticatePatient(
      dbInstance,
      cryptographyInstance,
      jwtInstance,
      PatientModel,
      credentials
    );

    res.cookie("jwt", data.refresh_token);
    res.status(200).json({
      status: "SUCCESS",
      data: {
        user: data.user,
        access_token: data.access_token,
      },
    });
  } catch (error) {
    res.status(401).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

const refreshPatientController = async (req, res) => {
  const { jwt } = req.cookies;

  if (!jwt) {
    res.status(401).json({
      status: "ERROR",
      message: "no cookies found",
    });
  }

  try {
    const dbInstance = new DB();
    const jwtInstance = new JWT();

    const access_token = await patientUserCaseInterface.refreshPatient(
      dbInstance,
      jwtInstance,
      PatientModel,
      jwt,
      process.env.REFRESH_TOKEN_SECRET
    );

    res.status(200).json({
      status: "SUCCESS",
      data: {
        access_token: access_token,
      },
    });
  } catch (error) {
    res.status(401).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

const logOutPatientController = async (req, res) => {
  const { jwt } = req.cookies;

  if (!jwt) {
    res.status(401).json({
      status: "ERROR",
      message: "no cookies found",
    });
  }

  try {
    const dbInstance = new DB();
    const jwtInstance = new JWT();

    await patientUserCaseInterface.logOutPatient(
      dbInstance,
      jwt,
      PatientModel,
      jwtInstance,
      process.env.REFRESH_TOKEN_SECRET
    );

    dbInstance.on("modelUpdated", () => {
      res.clearCookie("jwt");
      res.status(200).json({
        status: "SUCCESS",
        data: "log out successful",
      });
    });
  } catch (error) {
    res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

module.exports = {
  createPatientController,
  authenticatePatientController,
  refreshPatientController,
  logOutPatientController,
};
