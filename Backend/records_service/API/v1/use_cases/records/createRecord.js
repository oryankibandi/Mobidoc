const Record = require("../../entities/record");

const createRecord = async (
  dbInstance,
  cryptographyInstance,
  RecordModel,
  patient_uid
) => {
  const existing_record = await dbInstance.checkInstanceByField(
    RecordModel,
    "patient_uid",
    patient_uid
  );

  if (existing_record) throw new Error("Record already exists");

  const record_details = {};
  record_details.record_uid = cryptographyInstance.generateUUID();
  record_details.patient_uid = patient_uid;
  record_details.doctors_with_access = [];
  record_details.records = [];

  const new_record = new Record(record_details);
  new_record.prepend();

  await dbInstance.makeEntry(RecordModel, new_record.toFormattedJson());

  return new_record.getSummary();
};

module.exports = createRecord;
