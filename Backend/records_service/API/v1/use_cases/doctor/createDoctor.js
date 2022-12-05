const Doctor = require("../../entities/doctor");

const createDoctor = async (
  cryptographyInstance,
  dbInstance,
  DocModel,
  roles,
  docDetails,
  messageBroker
) => {
  const existing_entry_by_id = await dbInstance.checkInstanceByField(
    DocModel,
    "national_id",
    docDetails.national_id
  );
  const existing_entry_by_email = await dbInstance.checkInstanceByField(
    DocModel,
    "email",
    docDetails.email
  );

  if (existing_entry_by_id || existing_entry_by_email)
    throw new Error("ID no. or email is already registered");

  docDetails.doctor_uid = cryptographyInstance.generateUUID();
  docDetails.role = roles.doctor;
  docDetails.hashed_password = cryptographyInstance.hash(docDetails.password);

  const new_doctor = new Doctor(docDetails);
  new_doctor.prepend();

  const formatted_doctor = new_doctor.toFormattedJson();

  //TODO: send email to emailing service
  messageBroker.sendMessage({
    email: formatted_doctor.email,
    name: formatted_doctor.first_name,
  });

  await dbInstance.makeEntry(DocModel, formatted_doctor);

  return new_doctor.toCensoredJson();
};

module.exports = createDoctor;
