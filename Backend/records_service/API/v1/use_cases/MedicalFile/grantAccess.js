const MedicalFile = require("../../entities/medicalFile");

const grantAccess = async (
  dbInstance,
  doctor_uid,
  patient_uid,
  jwtInstance,
  MedicalFileModel
) => {
  const existing_file = await dbInstance.checkInstanceByField(
    MedicalFileModel,
    "patient_uid",
    patient_uid
  );

  if (!existing_file)
    throw new Error("medical file for the given patient_uid doesn't exist");

  if (patient_uid !== existing_file.patient_uid)
    throw new Error("patient does not own the medical file");

  const med_file = new MedicalFile(existing_file);
  const doctors_with_access =
    med_file.getDoctorsWithAccess().doctors_with_access;
  const requests = med_file.getRequests().doctors_requests;

  doctors_with_access.forEach((doc) => {
    if (doc.doctor_uid === doctor_uid) {
      throw new Error("Doctor already has access");
    }
  });

  let exists = false;
  requests.forEach((req) => {
    if (req.doctor_uid === doctor_uid) {
      exists = true;
    }
  });

  if (!exists) throw new Error("Request not found");

  const payload = {
    doctor_uid: doctor_uid,
    created_at: new Date(Date.now()),
  };

  const access_token = jwtInstance.generateRecordAccessToken(payload);

  await dbInstance.findOneAndUpdate(
    MedicalFileModel,
    { patient_uid: patient_uid },
    {
      $pull: { doctors_requests: { doctor_uid: doctor_uid } },
      $push: {
        doctors_with_access: {
          doctor_uid: doctor_uid,
          access_token: access_token,
        },
      },
    }
  );

  return true;
};

module.exports = grantAccess;
