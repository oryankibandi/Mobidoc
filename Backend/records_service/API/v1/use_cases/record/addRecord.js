const Record = require("../../entities/record");

const addRecord = async (
  dbInstance,
  RecordModel,
  MedicalFileModel,
  cryptographyInstance,
  recordDetails,
  patient_uid
) => {
  recordDetails.record_uid = cryptographyInstance.generateUUID();
  recordDetails.date = new Date(Date.now());

  const details_to_hash = JSON.stringify(recordDetails);
  recordDetails.record_hash = cryptographyInstance.hash(details_to_hash);

  const new_record = new Record(recordDetails);
  new_record.prepend();
  //add the id to the medical file collection
  const formatted_data = new_record.toFormattedJson();
  const summarized_data = new_record.getSummary();

  const existing_file = await dbInstance.checkInstanceByField(
    MedicalFileModel,
    "patient_uid",
    patient_uid
  );

  if (!existing_file)
    throw new Error("No patient record with the patient_uid found");

  const records_count = existing_file.records.length;
  await dbInstance.findOneAndUpdate(
    MedicalFileModel,
    { patient_uid: patient_uid },
    {
      $push: { records: summarized_data },
    }
  );

  //add the record in the records colletion
  await dbInstance.makeEntry(RecordModel, formatted_data);

  return summarized_data;
};

module.exports = addRecord;
