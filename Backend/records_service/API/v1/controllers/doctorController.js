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
    res.status(400).json({
      status: "ERROR",
      message: "first_namenot provided",
    });
  }
  if (!docDetails.last_name) {
    res.status(400).json({
      status: "ERROR",
      message: "last_namenot provided",
    });
  }
  if (!docDetails.national_id) {
    res.status(400).json({
      status: "ERROR",
      message: "national_id not provided",
    });
  }
  if (!docDetails.username) {
    res.status(400).json({
      status: "ERROR",
      message: "username not provided",
    });
  }
  if (!docDetails.email) {
    res.status(400).json({
      status: "ERROR",
      message: "email not provided",
    });
  }
  if (!docDetails.address) {
    res.status(400).json({
      status: "ERROR",
      message: "address not provided",
    });
  }
  if (!docDetails.place_of_work) {
    res.status(400).json({
      status: "ERROR",
      message: "place_of_work not provided",
    });
  }
  if (!docDetails.area_of_specialty) {
    res.status(400).json({
      status: "ERROR",
      message: "area_of_specialty not provided",
    });
  }
  if (!docDetails.password) {
    res.status(400).json({
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

    res.status(200).json({
      status: "SUCCESS",
      data: new_doctor,
    });
  } catch (error) {
    res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

const authenticateDoctorController = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(400).json({
      status: "ERROR",
      message: "email not provided",
    });
  }
  if (!password) {
    res.status(400).json({
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

const refreshDoctorController = async (req, res) => {
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

    const access_token = await doctorUserCaseInterface.refreshDoctor(
      dbInstance,
      jwtInstance,
      DocModel,
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

const logOutDoctorController = async (req, res) => {
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

    await doctorUserCaseInterface.logOutDoctor(
      dbInstance,
      jwt,
      DocModel,
      jwtInstance,
      process.env.REFRESH_TOKEN_SECRET
    );

    dbInstance.on("modelUpdated", () => {
      res.clearCookie("jwt");
      res.status(200).json({
        status: "SUCCESS",
        data: "logged out successfully",
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
  createDoctorController,
  authenticateDoctorController,
  refreshDoctorController,
  logOutDoctorController,
};
