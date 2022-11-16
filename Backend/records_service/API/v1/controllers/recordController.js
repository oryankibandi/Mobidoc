const recordUseCaseInterface = require("../use_cases/record/recordUserCaseInterface");
const DB = require("../DB/mongoDB/mongoDBInterface");
const RecordModel = require("../DB/mongoDB/schema/recordsSchema");
const MedicalFileModel = require("../DB/mongoDB/schema/medicalFilesSchema");
const Cryptography = require("../helpers/cryptography");
const roles = require("../config/roles");

const getRecordControler = async (req, res) => {
  const { record_uid } = req.params;
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

  //TODO: Implement: only doctors with access to a patient's record can get a patient's record
  try {
    const dbInstance = new DB();
    const record = await recordUseCaseInterface.getRecord(
      dbInstance,
      RecordModel,
      record_uid
    );

    return res.status(200).json({
      status: "SUCCESS",
      data: record,
    });
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
    res.status(400).json({
      status: "ERROR",
      message: "symptoms not provided",
    });
  }
  if (!record_details.diagnosis) {
    res.status(400).json({
      status: "ERROR",
      message: "diagnosis not provided",
    });
  }
  if (!record_details.medication) {
    res.status(400).json({
      status: "ERROR",
      message: "medication not provided",
    });
  }
  if (!record_details.patient_uid) {
    res.status(400).json({
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
    record_details.doctor_uid = user.doctor_uid;

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
  const { patient_uid } = req.query;

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

  try {
    const dbInstance = new DB();
    const retrieved_records = await recordUseCaseInterface.getRecords(
      dbInstance,
      RecordModel,
      req.query
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

module.exports = {
  getRecordControler,
  addRecordController,
  getRecordsController,
};
