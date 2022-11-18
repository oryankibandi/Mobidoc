require("dotenv").config();
const patientUserCaseInterface = require("../use_cases/patient/patientUseCaseInterface");
const Cryptography = require("../helpers/cryptography");
const DB = require("../DB/mongoDB/mongoDBInterface");
const JWT = require("../helpers/jwt");
const PatientModel = require("../DB/mongoDB/schema/patientsSchema");
const MedicalFileModel = require("../DB/mongoDB/schema/medicalFilesSchema");
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
      MedicalFileModel,
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

const getPatientController = async (req, res) => {
  const { user } = req;
  const { patient_uid } = req.params;

  if (!user) {
    return res.status(401).json({
      status: "ERROR",
      message: "forbidden",
    });
  }
  if (!patient_uid) {
    return res.status(402).json({
      status: "ERROR",
      message: "patient id must be provided as a path parameter",
    });
  }

  if (user.role !== roles.doctor && user.patient_uid !== patient_uid) {
    return res.status(401).json({
      status: "ERROR",
      message: "Unauthorized",
    });
  }

  try {
    const dbInstance = new DB();
    const patientDetails = await patientUserCaseInterface.getPatient(
      dbInstance,
      PatientModel,
      patient_uid
    );

    return res.status(200).json({
      status: "SUCCESS",
      data: patientDetails,
    });
  } catch (error) {
    return res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

const updatePatientController = async (req, res) => {
  const { user } = req;
  const { patient_uid } = req.params;
  const new_values = req.body;

  if (!user) {
    return res.status(401).json({
      status: "ERROR",
      message: "unautheniticated",
    });
  }

  if (!patient_uid) {
    return res.status(400).json({
      status: "ERROR",
      message: "patient_uid must be provided as a path parameter",
    });
  }

  if (user.role !== roles.patient) {
    return res.status(403).json({
      status: "ERROR",
      message: "forbidden",
    });
  }

  if (patient_uid !== user.patient_uid) {
    return res.status(403).json({
      status: "ERROR",
      message: "forbidden",
    });
  }

  try {
    const dbInstance = new DB();
    const new_patient = await patientUserCaseInterface.updatePatient(
      dbInstance,
      PatientModel,
      patient_uid,
      new_values
    );

    return res.status(201).json({
      status: "SUCCESS",
      data: new_patient,
    });
  } catch (error) {
    return res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

const getPatientsController = async (req, res) => {
  const { user } = req;
  const { count, page, national_id } = req.query;

  const filters = {};
  if (national_id) filters.national_id = national_id;

  if (user.role !== roles.doctor) {
    return res.status(401).json({
      status: "ERROR",
      message: "Unauthorized",
    });
  }

  try {
    const dbInstance = new DB();
    const data = await patientUserCaseInterface.getPatients(
      dbInstance,
      PatientModel,
      filters,
      page,
      count
    );

    return res.status(200).json({
      status: "SUCCESS",
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
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
  getPatientController,
  getPatientsController,
  updatePatientController,
};
