const Patient = require("../../entities/patient");

const updatePatient = async (
  dbInstance,
  PatientModel,
  patient_uid,
  new_values
) => {
  for (const [key, value] of Object.entries(new_values)) {
    if (key === "patient_uid") throw new Error("cannot change patient_uid");
    if (key === "refresh_token")
      throw new Error("Not authorized to change refresh_token");
    if (key === "record_uid")
      throw new Error("Not authorized to change record_uid");
    if (key === "chat_uid")
      throw new Error("Not authorized to change chat_uid");
  }

  const existing_patient = await dbInstance.checkInstanceByField(
    PatientModel,
    "patient_uid",
    patient_uid
  );

  if (!existing_patient) throw new Error("No user found");

  const updated_entry = await dbInstance.findOneAndUpdate(
    PatientModel,
    { patient_uid: patient_uid },
    new_values
  );

  const new_patient = new Patient(updated_entry);

  return new_patient.toCensoredJson();
};

module.exports = updatePatient;
