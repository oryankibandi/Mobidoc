const Doctor = require("../../entities/doctor");

const updateDoctor = async (dbInstance, DocModel, doctor_uid, new_values) => {
  for (const [key, value] of Object.entries(new_values)) {
    if (key === "doctor_uid") throw new Error("cannot change doctor_uid");
    if (key === "refresh_token")
      throw new Error("Not authorized to change refresh_token");
  }

  const existing_doctor = await dbInstance.checkInstanceByField(
    DocModel,
    "doctor_uid",
    doctor_uid
  );

  if (!existing_doctor) throw new Error("No user found");

  const updated_entry = await dbInstance.findOneAndUpdate(
    DocModel,
    { doctor_uid: doctor_uid },
    new_values
  );

  const new_doctor = new Doctor(updated_entry);

  return new_doctor.toCensoredJson();
};

module.exports = updateDoctor;
