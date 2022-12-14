const recordUseCaseInterface = require("../use_cases/record/recordUserCaseInterface");
const medicalFileUseCaseInterface = require("../use_cases/MedicalFile/medicalFileUseCaseInterface");
const DB = require("../DB/mongoDB/mongoDBInterface");
const RecordModel = require("../DB/mongoDB/schema/recordsSchema");
const MedicalFileModel = require("../DB/mongoDB/schema/medicalFilesSchema");
const PatientModel = require("../DB/mongoDB/schema/patientsSchema");
const DocModel = require("../DB/mongoDB/schema/doctorsSchema");
const Cryptography = require("../helpers/cryptography");
const JWT = require("../helpers/jwt");
const roles = require("../config/roles");

const getRecordControler = async (req, res) => {
  const { patient_uid, record_uid } = req.params;
  const { user } = req;

  if (user.role !== roles.doctor) {
    return res.status(401).json({
      status: "ERROR",
      message: "unauthorized",
    });
  }

  if (!record_uid) {
    return res.status(400).json({
      status: "ERROR",
      message: "record_uid must be provided as a path parameter",
    });
  }
  if (!patient_uid) {
    return res.status(400).json({
      status: "ERROR",
      message: "patient_uid must be provided as a path parameter",
    });
  }

  //TODO: Implement: only doctors with access to a patient's record can get a patient's record
  try {
    const dbInstance = new DB();
    const jwtInstance = new JWT();

    const access = await medicalFileUseCaseInterface.verifyAccess(
      dbInstance,
      MedicalFileModel,
      user.doctor_uid,
      patient_uid,
      jwtInstance,
      process.env.RECORD_ACCESS_SECRET
    );
    if (access) {
      const record = await recordUseCaseInterface.getRecord(
        dbInstance,
        RecordModel,
        record_uid
      );

      return res.status(200).json({
        status: "SUCCESS",
        data: record,
      });
    } else {
      return res.status(401).json({
        status: "ERROR",
        message: "Unauthorized to access this record",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

const addRecordController = async (req, res) => {
  const record_details = req.body;
  const { user } = req;

  if (!record_details.symptoms) {
    return res.status(400).json({
      status: "ERROR",
      message: "symptoms not provided",
    });
  }
  if (!record_details.diagnosis) {
    return res.status(400).json({
      status: "ERROR",
      message: "diagnosis not provided",
    });
  }
  if (!record_details.medication) {
    return res.status(400).json({
      status: "ERROR",
      message: "medication not provided",
    });
  }
  if (!record_details.patient_uid) {
    return res.status(400).json({
      status: "ERROR",
      message: "patient_uid not provided",
    });
  }

  if (user.role !== roles.doctor) {
    return res.status(401).json({
      status: "ERROR",
      message: "unauthorized",
    });
  }

  try {
    const dbInstance = new DB();
    const cryptographyInstance = new Cryptography();
    const jwtInstance = new JWT();
    record_details.doctor_uid = user.doctor_uid;

    const access = await medicalFileUseCaseInterface.verifyAccess(
      dbInstance,
      MedicalFileModel,
      user.doctor_uid,
      record_details.patient_uid,
      jwtInstance,
      process.env.RECORD_ACCESS_SECRET
    );

    if (!access) {
      return res.status(401).json({
        status: "ERROR",
        message: "unauthorized",
      });
    }

    const added_record = await recordUseCaseInterface.addRecord(
      dbInstance,
      RecordModel,
      MedicalFileModel,
      cryptographyInstance,
      record_details,
      record_details.patient_uid
    );

    return res.status(200).json({
      status: "SUCCESS",
      data: added_record,
    });
  } catch (error) {
    return res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

const getRecordsController = async (req, res) => {
  const { user } = req;
  const { patient_uid, from, to, page, count } = req.query;

  if (!patient_uid) {
    return res.status(400).json({
      status: "ERROR",
      message: "patient_uid query param is required ",
    });
  }

  if (user.role !== roles.doctor && user.patient_uid !== patient_uid) {
    return res.status(401).json({
      status: "ERROR",
      message: "Unauthorized",
    });
  }
  const filters = {
    patient_uid: patient_uid,
  };

  if (from && to) {
    let date = { $gte: new Date(from), $lte: new Date(to) };
    filters.date = date;
  } else if (from && !to) {
    let date = { $gte: new Date(from) };
    filters.date = date;
  } else if (!from && to) {
    let date = { $lte: new Date(to) };
    filters.date = date;
  } else {
  }

  try {
    const dbInstance = new DB();
    const jwtInstance = new JWT();

    if (user.role === roles.doctor) {
      const access = await medicalFileUseCaseInterface.verifyAccess(
        dbInstance,
        MedicalFileModel,
        user.doctor_uid,
        patient_uid,
        jwtInstance,
        process.env.RECORD_ACCESS_SECRET
      );

      if (!access) {
        return res.status(401).json({
          status: "ERROR",
          message: "unauthorized",
        });
      }
    }

    const retrieved_records = await recordUseCaseInterface.getRecords(
      dbInstance,
      RecordModel,
      filters,
      page,
      count
    );

    return res.status(200).json({
      status: "SUCCESS",
      data: retrieved_records,
    });
  } catch (error) {
    return res.status(400).json({
      status: "SUCCESS",
      message: error.message,
    });
  }
};

const requestAccessController = async (req, res) => {
  const { user } = req;
  const { patient_uid } = req.body;

  if (user.role !== roles.doctor) {
    return res.status(402).json({
      status: "ERROR",
      message: "unauthorized",
    });
  }
  if (!patient_uid) {
    return res.status(400).json({
      status: "ERROR",
      message: "patient_uid must be provided",
    });
  }

  try {
    const dbInstance = new DB();
    const jwtInstance = new JWT();

    const requested = await medicalFileUseCaseInterface.requestAccess(
      dbInstance,
      user.doctor_uid,
      patient_uid,
      MedicalFileModel,
      jwtInstance,
      process.env.RECORD_ACCESS_SECRET
    );

    if (requested) {
      return res.status(200).json({
        status: "SUCCESS",
        data: "request sent",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

const grantAccessController = async (req, res) => {
  const { user } = req;
  const { doctor_uid } = req.body;

  if (user.role !== roles.patient) {
    return res.status(401).json({
      status: "ERROR",
      message: "unauthorized",
    });
  }

  if (!doctor_uid) {
    return res.status(400).json({
      status: "ERROR",
      message: "doctor_uid not provided",
    });
  }

  try {
    const dbInstance = new DB();
    const jwtInstance = new JWT();

    const granted = await medicalFileUseCaseInterface.grantAccess(
      dbInstance,
      doctor_uid,
      user.patient_uid,
      jwtInstance,
      MedicalFileModel
    );

    return res.status(200).json({
      status: "SUCCESS",
      data: "access granted for 7 days",
    });
  } catch (error) {
    return res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

const getRequestsController = async (req, res) => {
  const { user } = req;

  if (user.role !== roles.patient) {
    return res.status(401).json({
      status: "ERROR",
      message: "unauthorized",
    });
  }

  try {
    const dbInstance = new DB();

    const requests = await medicalFileUseCaseInterface.getRequests(
      dbInstance,
      MedicalFileModel,
      DocModel,
      user.patient_uid
    );

    return res.status(200).json({
      status: "SUCCESS",
      data: requests,
    });
  } catch (error) {
    return res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

const checkRequestStatusController = async (req, res) => {
  const { doctor_uid } = req.user;
  const { role } = req.user;
  const { patient_uid } = req.params;

  if (!doctor_uid) {
    console.log("doc_uid not found");
    return res.status(401).json({
      status: "ERROR",
      message: "unauthorized",
    });
  }

  if (!patient_uid) {
    return res.status(400).json({
      status: "ERROR",
      message: "patient_uid not provided as a path parameter",
    });
  }

  if (role !== parseInt(process.env.DOCTOR)) {
    console.log("role is not doctor");
    return res.status(401).json({
      status: "ERROR",
      message: "unauthorized",
    });
  }

  try {
    const dbInstance = new DB();

    const access = await medicalFileUseCaseInterface.checkRequestStatus(
      dbInstance,
      MedicalFileModel,
      doctor_uid,
      patient_uid
    );

    return res.status(200).json({
      status: access.toUpperCase(),
      data: access,
    });
  } catch (error) {
    return res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

const getPairedPatientsController = async (req, res) => {
  const { doctor_uid } = req.user;
  const { role } = req.user;

  if (!doctor_uid) {
    return res.status(401).json({
      status: "ERROR",
      message: "unauthorized",
    });
  }

  if (!role) {
    return res.status(401).json({
      status: "ERROR",
      message: "unauthorized",
    });
  }

  try {
    const dbInstance = new DB();
    const patients = await medicalFileUseCaseInterface.getPairedPatients(
      dbInstance,
      MedicalFileModel,
      PatientModel,
      doctor_uid
    );

    return res.status(200).json({
      status: "SUCCESS",
      data: patients,
    });
  } catch (error) {
    return res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
  }
};

module.exports = {
  getRecordControler,
  addRecordController,
  getRecordsController,
  requestAccessController,
  grantAccessController,
  getRequestsController,
  checkRequestStatusController,
  getPairedPatientsController,
};
