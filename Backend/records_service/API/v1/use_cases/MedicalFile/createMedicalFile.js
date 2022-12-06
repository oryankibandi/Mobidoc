const MedicalFile = require("../../entities/medicalFile");

const createMedicalFile = async (
  dbInstance,
  cryptographyInstance,
  MedicalFileModel,
  patient_uid
) => {
  const existing_record = await dbInstance.checkInstanceByField(
    MedicalFileModel,
    "patient_uid",
    patient_uid
  );

  if (existing_record) throw new Error("Record already exists");

  const record_details = {};
  record_details.med_file_uid = cryptographyInstance.generateUUID();
  record_details.patient_uid = patient_uid;
  record_details.doctors_with_access = [];
  record_details.records = [];

  const new_med_file = new MedicalFile(record_details);
  new_med_file.prepend();

  await dbInstance.makeEntry(MedicalFileModel, new_med_file.toFormattedJson());

  return new_med_file.getSummary();
};

module.exports = createMedicalFile;
