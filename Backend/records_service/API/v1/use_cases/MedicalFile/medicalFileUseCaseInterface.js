const createMedicalFile = require("./createMedicalFile");

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
};
