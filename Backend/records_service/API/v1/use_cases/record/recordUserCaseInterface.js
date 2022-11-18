const addRecord = require("./addRecord");
const getRecord = require("./getRecord");
const getRecords = require("./getRecords");

module.exports = {
  addRecord: async (
    dbInstance,
    RecordModel,
    MedicalFileModel,
    cryptographyInstance,
    recordDetails,
    patient_uid
  ) =>
    addRecord(
      dbInstance,
      RecordModel,
      MedicalFileModel,
      cryptographyInstance,
      recordDetails,
      patient_uid
    ),
  getRecord: async (dbInstance, RecordModel, record_uid) =>
    getRecord(dbInstance, RecordModel, record_uid),
  getRecords: async (dbInstance, RecordModel, filters, page, count) =>
    getRecords(dbInstance, RecordModel, filters, page, count),
};
