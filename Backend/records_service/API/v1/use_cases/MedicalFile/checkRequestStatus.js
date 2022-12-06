const MedicalFile = require("../../entities/medicalFile");

const checkRequestStatus = async (
  dbInstance,
  MedicalFileModel,
  doctorUid,
  patientUid
) => {
  const existing_file = await dbInstance.checkInstanceByField(
    MedicalFileModel,
    "patient_uid",
    patientUid
  );

  if (!existing_file) throw new Error("invalid patient_uid");

  const med_file = new MedicalFile(existing_file);

  for (const obj of med_file.getRequests().doctors_requests) {
    if (obj.doctor_uid === doctorUid) {
      return "pending";
    }
  }

  for (const obj of med_file.getDoctorsWithAccess().doctors_with_access) {
    if (obj.doctor_uid === doctorUid) {
      return "granted";
    }
  }

  return "denied";
};

module.exports = checkRequestStatus;
