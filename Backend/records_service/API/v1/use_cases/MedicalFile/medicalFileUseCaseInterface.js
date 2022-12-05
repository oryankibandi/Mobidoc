const createMedicalFile = require("./createMedicalFile");
const verifyAccess = require("./verifyAccess");
const requestAccess = require("./requestAccess");
const grantAccess = require("./grantAccess");
const getRequests = require("./getRequests");
const checkRequestStatus = require("./checkRequestStatus");

module.exports = {
  createMedicalFile: async (
    dbInstance,
    cryptographyInstance,
    RecordModel,
    patient_uid
  ) =>
    createMedicalFile(
      dbInstance,
      cryptographyInstance,
      RecordModel,
      patient_uid
    ),
  verifyAccess: async (
    dbInstance,
    MedicalFileModel,
    doctor_uid,
    patient_uid,
    jwtInstance,
    record_access_secret
  ) =>
    verifyAccess(
      dbInstance,
      MedicalFileModel,
      doctor_uid,
      patient_uid,
      jwtInstance,
      record_access_secret
    ),
  requestAccess: async (
    dbInstance,
    doctor_uid,
    patient_uid,
    MedicalFileModel,
    jwtInstance,
    access_token_secret
  ) =>
    requestAccess(
      dbInstance,
      doctor_uid,
      patient_uid,
      MedicalFileModel,
      jwtInstance,
      access_token_secret
    ),
  grantAccess: async (
    dbInstance,
    doctor_uid,
    patient_uid,
    jwtInstance,
    MedicalFileModel
  ) =>
    grantAccess(
      dbInstance,
      doctor_uid,
      patient_uid,
      jwtInstance,
      MedicalFileModel
    ),
  getRequests: async (dbInstance, MedicalFileModel, DocModel, patient_uid) =>
    getRequests(dbInstance, MedicalFileModel, DocModel, patient_uid),
  checkRequestStatus: async (
    dbInstance,
    MedicalFileModel,
    doctorUid,
    patientUid
  ) => checkRequestStatus(dbInstance, MedicalFileModel, doctorUid, patientUid),
};
