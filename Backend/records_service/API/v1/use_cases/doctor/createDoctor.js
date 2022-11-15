const Doctor = require("../../entities/doctor");

const createDoctor = async (
  cryptographyInstance,
  dbInstance,
  DocModel,
  roles,
  docDetails
) => {
  const existing_entry = await dbInstance.checkInstanceByField(
    DocModel,
    "national_id",
    docDetails.national_id
  );

  if (existing_entry) throw new Error("Already registered");

  docDetails.doctor_uid = cryptographyInstance.generateUUID();
  docDetails.role = roles.doctor;
  docDetails.hashed_password = cryptographyInstance.hash(docDetails.password);

  const new_doctor = new Doctor(docDetails);
  new_doctor.prepend();

  const formatted_doctor = new_doctor.toFormattedJson();

  //TODO: send email to emailing service

  await dbInstance.makeEntry(DocModel, formatted_doctor);

  return new_doctor.toCensoredJson();
};

module.exports = createDoctor;
