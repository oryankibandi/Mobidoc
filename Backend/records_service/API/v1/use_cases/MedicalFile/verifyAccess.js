const MedicalFile = require("../../entities/medicalFile");

const verifyAccess = async (
  dbInstance,
  MedicalFileModel,
  doctor_uid,
  patient_uid,
  jwtInstance,
  record_access_secret
) => {
  const existing_file = await dbInstance.checkInstanceByField(
    MedicalFileModel,
    "patient_uid",
    patient_uid
  );

  if (!existing_file)
    throw new Error("No record found for the given patient_uid");

  const med_file = new MedicalFile(existing_file);

  let access = false;

  jwtInstance.on("invalidToken", (error) => {
    throw new Error(
      "Not allowed to access this record or access time has expired"
    );
  });

  med_file.getDoctorsWithAccess().doctors_with_access.forEach((doc) => {
    if (doc.doctor_uid === doctor_uid) {
      const decoded = jwtInstance.verify(
        doc.access_token,
        record_access_secret
      );

      if (decoded.doctor_uid === doctor_uid) {
        access = true;
      }
    }
  });

  return access;
};

module.exports = verifyAccess;
