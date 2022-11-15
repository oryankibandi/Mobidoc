require("dotenv").config();
const doctorUserCaseInterface = require("../use_cases/doctor/doctorUserCaseInterface");
const DB = require("../DB/mongoDB/mongoDBInterface");
const Cryptography = require("../helpers/cryptography");
const DocModel = require("../DB/mongoDB/schema/doctorsSchema");
const roles = require("../config/roles");
const JWT = require("../helpers/jwt");

const createDoctorController = async (req, res) => {
  const docDetails = req.body;

  if (!docDetails.first_name) {
    return res.status(400).json({
      status: "ERROR",
      message: "first_namenot provided",
    });
  }
  if (!docDetails.last_name) {
    return res.status(400).json({
      status: "ERROR",
      message: "last_namenot provided",
    });
  }
  if (!docDetails.national_id) {
    return res.status(400).json({
      status: "ERROR",
      message: "national_id not provided",
    });
  }
  if (!docDetails.username) {
    return res.status(400).json({
      status: "ERROR",
      message: "username not provided",
    });
  }
  if (!docDetails.email) {
    return res.status(400).json({
      status: "ERROR",
      message: "email not provided",
    });
  }
  if (!docDetails.address) {
    return res.status(400).json({
      status: "ERROR",
      message: "address not provided",
    });
  }
  if (!docDetails.place_of_work) {
    return res.status(400).json({
      status: "ERROR",
      message: "place_of_work not provided",
    });
  }
  if (!docDetails.area_of_specialty) {
    return res.status(400).json({
      status: "ERROR",
      message: "area_of_specialty not provided",
    });
  }
  if (!docDetails.password) {
    return res.status(400).json({
      status: "ERROR",
      message: "password not provided",
    });
  }

  try {
    const dbInstance = new DB();
    const cryptographyInstance = new Cryptography();
    const new_doctor = await doctorUserCaseInterface.createDoctor(
      cryptographyInstance,
      dbInstance,
      DocModel,
      roles,
      docDetails
    );

    return res.status(200).json({
      status: "SUCCESS",
      data: new_doctor,
    });
  } catch (error) {
    return res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

const authenticateDoctorController = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      status: "ERROR",
      message: "email not provided",
    });
  }
  if (!password) {
    return res.status(400).json({
      status: "ERROR",
      message: "password not provided",
    });
  }

  try {
    const dbInstance = new DB();
    const cryptographyInstance = new Cryptography();
    const jwtInstance = new JWT();

    const data = await doctorUserCaseInterface.authenticateDoctor(
      dbInstance,
      cryptographyInstance,
      jwtInstance,
      DocModel,
      req.body
    );

    res.cookie("jwt", data.refresh_token);
    return res.status(200).json({
      status: "SUCCESS",
      data: {
        user: data.user,
        access_token: data.access_token,
      },
    });
  } catch (error) {
    return res.status(401).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

const refreshDoctorController = async (req, res) => {
  const { jwt } = req.cookies;

  if (!jwt) {
    return res.status(401).json({
      status: "ERROR",
      message: "no cookies found",
    });
  }

  try {
    const dbInstance = new DB();
    const jwtInstance = new JWT();

    const access_token = await doctorUserCaseInterface.refreshDoctor(
      dbInstance,
      jwtInstance,
      DocModel,
      jwt,
      process.env.REFRESH_TOKEN_SECRET
    );

    return res.status(200).json({
      status: "SUCCESS",
      data: {
        access_token: access_token,
      },
    });
  } catch (error) {
    return res.status(401).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

const logOutDoctorController = async (req, res) => {
  const { jwt } = req.cookies;

  if (!jwt) {
    return res.status(401).json({
      status: "ERROR",
      message: "no cookies found",
    });
  }

  try {
    const dbInstance = new DB();
    const jwtInstance = new JWT();

    await doctorUserCaseInterface.logOutDoctor(
      dbInstance,
      jwt,
      DocModel,
      jwtInstance,
      process.env.REFRESH_TOKEN_SECRET
    );

    dbInstance.on("modelUpdated", () => {
      res.clearCookie("jwt");
      return res.status(200).json({
        status: "SUCCESS",
        data: "logged out successfully",
      });
    });
  } catch (error) {
    return res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

const getDoctorController = async (req, res) => {
  const { user } = req;
  const { doctor_uid } = req.params;

  if (!user) {
    return res.status(401).json({
      status: "ERROR",
      message: "forbidden",
    });
  }
  if (!doctor_uid) {
    return res.status(402).json({
      status: "ERROR",
      message: "doctor_uid must be provided as a path parameter",
    });
  }

  try {
    const dbInstance = new DB();
    const doc_details = await doctorUserCaseInterface.getDoctor(
      dbInstance,
      DocModel,
      doctor_uid
    );

    return res.status(200).json({
      status: "SUCCESS",
      data: doc_details,
    });
  } catch (error) {
    return res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

const updateDoctorController = async (req, res) => {
  const { user } = req;
  const { doctor_uid } = req.params;
  const new_values = req.body;

  if (!user) {
    return res.status(401).json({
      status: "ERROR",
      message: "unautheniticated",
    });
  }

  if (!doctor_uid) {
    return res.status(400).json({
      status: "ERROR",
      message: "doctor_uid must be provided as a path parameter",
    });
  }

  if (user.role !== roles.doctor) {
    return res.status(403).json({
      status: "ERROR",
      message: "forbidden",
    });
  }

  if (doctor_uid !== user.doctor_uid) {
    return res.status(403).json({
      status: "ERROR",
      message: "forbidden",
    });
  }

  try {
    const dbInstance = new DB();
    const new_doctor = await doctorUserCaseInterface.updateDoctor(
      dbInstance,
      DocModel,
      doctor_uid,
      new_values
    );

    return res.status(201).json({
      status: "SUCCESS",
      data: new_doctor,
    });
  } catch (error) {
    return res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

const getDoctorsController = async (req, res) => {
  try {
    const dbInstance = new DB();
    const data = await doctorUserCaseInterface.getDoctors(
      dbInstance,
      DocModel,
      req.query
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
  createDoctorController,
  authenticateDoctorController,
  refreshDoctorController,
  logOutDoctorController,
  getDoctorController,
  updateDoctorController,
  getDoctorsController,
};
