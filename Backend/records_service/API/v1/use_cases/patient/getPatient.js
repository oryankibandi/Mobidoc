const Patient = require("../../entities/patient");

const getPatient = async (dbInstance, PatientModel, patient_uid) => {
  const existing_user = await dbInstance.checkInstanceByField(
    PatientModel,
    "patient_uid",
    patient_uid
  );

  if (!existing_user) throw new Error("User not found");

  const patient_obj = new Patient(existing_user);

  return patient_obj.toCensoredJson();
};

module.exports = getPatient;
