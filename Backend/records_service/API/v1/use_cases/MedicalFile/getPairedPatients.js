const MedicalFile = require("../../entities/medicalFile");
const Patient = require("../../entities/patient");

const getPairedPatients = async (
  dbInstance,
  MedicalFileModel,
  PatientModel,
  doctorUid
) => {
  const paired_files = await dbInstance.findMany(MedicalFileModel, {
    "doctors_with_access.doctor_uid": doctorUid,
  });

  if (paired_files.length <= 0) {
    return paired_files;
  }

  const patient_promises = [];
  paired_files.forEach((file) => {
    let new_file = new MedicalFile(file);
    let patient_uid = new_file.patient_uid;
    patient_promises.push(
      dbInstance.checkInstanceByField(PatientModel, "patient_uid", patient_uid)
    );
  });

  const patients_details = await Promise.all(patient_promises);

  const patient_data = patients_details.map((pat) => {
    let new_patient = new Patient(pat);
    return new_patient.toCensoredJson();
  });

  return patient_data;
};

module.exports = getPairedPatients;
