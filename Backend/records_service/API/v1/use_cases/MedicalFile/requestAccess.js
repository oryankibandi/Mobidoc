const MedicalFile = require("../../entities/medicalFile");

const requestAccess = async (
  dbInstance,
  doctor_uid,
  patient_uid,
  MedicalFileModel,
  jwtInstance,
  access_token_secret
) => {
  const existing_file = await dbInstance.checkInstanceByField(
    MedicalFileModel,
    "patient_uid",
    patient_uid
  );
  console.log("existing_file: ", existing_file);

  if (!existing_file) throw new Error("No patient file found");

  const med_file = new MedicalFile(existing_file);
  const doctors_with_access =
    med_file.getDoctorsWithAccess().doctors_with_access;
  const doctors_requests = med_file.getRequests().doctors_requests;

  doctors_requests.forEach((request) => {
    if (request.doctor_uid === doctor_uid)
      throw new Error("Request was already sent");
  });
  doctors_with_access.forEach((access) => {
    if (access.doctor_uid === doctor_uid) {
      const decoded = jwtInstance.verify(
        access.access_token,
        access_token_secret
      );

      if (decoded) throw new Error("Already have access to the record");
    }
  });

  const new_request = {
    doctor_uid: doctor_uid,
    date: new Date(Date.now()),
  };

  await dbInstance.findOneAndUpdate(
    MedicalFileModel,
    { patient_uid: patient_uid },
    { $push: { doctors_requests: new_request } }
  );

  return true;
};

module.exports = requestAccess;
