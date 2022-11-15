const createRecord = require("./createRecord");

module.exports = {
  createRecord: async (
    dbInstance,
    cryptographyInstance,
    RecordModel,
    patient_uid
  ) => createRecord(dbInstance, cryptographyInstance, RecordModel, patient_uid),
};
