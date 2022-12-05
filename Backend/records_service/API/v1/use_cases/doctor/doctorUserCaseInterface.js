const createDoctor = require("./createDoctor");
const authenticateDoctor = require("./authenticateDoctor");
const logOutDoctor = require("./logOutDoctor");
const refreshDoctor = require("./refreshDoctor");
const getDoctor = require("./getDoctor");
const updateDoctor = require("./updateDoctor");
const getDoctors = require("./getDoctors");

module.exports = {
  createDoctor: async (
    cryptographyInstance,
    dbInstance,
    DocModel,
    roles,
    docDetails,
    messageBroker
  ) =>
    createDoctor(
      cryptographyInstance,
      dbInstance,
      DocModel,
      roles,
      docDetails,
      messageBroker
    ),

  authenticateDoctor: async (
    dbInstance,
    cryptographyInstance,
    jwtInstance,
    DocModel,
    docDetails
  ) =>
    authenticateDoctor(
      dbInstance,
      cryptographyInstance,
      jwtInstance,
      DocModel,
      docDetails
    ),
  logOutDoctor: async (
    dbInstance,
    refresh_token,
    DocModel,
    jwtInstance,
    refresh_token_secret
  ) =>
    logOutDoctor(
      dbInstance,
      refresh_token,
      DocModel,
      jwtInstance,
      refresh_token_secret
    ),
  refreshDoctor: async (
    dbInstance,
    jwtInstance,
    DocModel,
    refresh_token,
    refresh_token_secret
  ) =>
    refreshDoctor(
      dbInstance,
      jwtInstance,
      DocModel,
      refresh_token,
      refresh_token_secret
    ),
  getDoctor: async (dbInstance, DocModel, doctor_uid) =>
    getDoctor(dbInstance, DocModel, doctor_uid),
  updateDoctor: async (dbInstance, DocModel, doctor_uid, new_values) =>
    updateDoctor(dbInstance, DocModel, doctor_uid, new_values),
  getDoctors: async (
    dbInstance,
    DocModel,
    MedicalFileModel,
    filters,
    page,
    count,
    patientUid
  ) =>
    getDoctors(
      dbInstance,
      DocModel,
      MedicalFileModel,
      filters,
      page,
      count,
      patientUid
    ),
};
