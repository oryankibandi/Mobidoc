const Record = require("../../entities/record");

const getRecord = async (dbInstance, RecordModel, record_uid) => {
  const existing_record = await dbInstance.checkInstanceByField(
    RecordModel,
    "record_uid",
    record_uid
  );

  if (!existing_record)
    throw new Error("No record with given record_uid found");

  const retrieved_record = new Record(existing_record);

  return retrieved_record.toCensoredJson();
};

module.exports = getRecord;
