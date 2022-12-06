const Doctor = require("../../entities/doctor");

const getDoctor = async (dbInstance, DocModel, doctor_uid) => {
  const existing_user = await dbInstance.checkInstanceByField(
    DocModel,
    "doctor_uid",
    doctor_uid
  );

  if (!existing_user) throw new Error("User not found");

  const doc_object = new Doctor(existing_user);

  return doc_object.toProfileJson();
};

module.exports = getDoctor;
