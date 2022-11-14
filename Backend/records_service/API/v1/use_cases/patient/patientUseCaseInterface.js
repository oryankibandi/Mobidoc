const createPatient = require("./createPatient");
const authenticatePatient = require("./authenticatePatient");
const logOutPatient = require("./logOutPatient");
const refreshPatient = require("./refreshPatient");

module.exports = {
  createPatient: async (
    cryptographyInstance,
    dbInstance,
    PatientModel,
    RecordModel,
    roles,
    patientDetails
  ) =>
    createPatient(
      cryptographyInstance,
      dbInstance,
      PatientModel,
      RecordModel,
      roles,
      patientDetails
    ),
  authenticatePatient: async (
    dbInstance,
    cryptographyInstance,
    jwtInstance,
    PatientModel,
    patientDetails
  ) =>
    authenticatePatient(
      dbInstance,
      cryptographyInstance,
      jwtInstance,
      PatientModel,
      patientDetails
    ),

  logOutPatient: async (
    dbInstance,
    refresh_token,
    PatientModel,
    jwtInstance,
    refresh_token_secret
  ) =>
    logOutPatient(
      dbInstance,
      refresh_token,
      PatientModel,
      jwtInstance,
      refresh_token_secret
    ),
  refreshPatient: async (
    dbInstance,
    jwtInstance,
    PatientModel,
    refresh_token,
    refresh_token_secret
  ) =>
    refreshPatient(
      dbInstance,
      jwtInstance,
      PatientModel,
      refresh_token,
      refresh_token_secret
    ),
};