const MedicalFile = require("../../entities/medicalFile");
const Doctor = require("../../entities/doctor");

const getRequests = async (
  dbInstance,
  MedicalFileModel,
  DocModel,
  patient_uid
) => {
  const existing_file = await dbInstance.checkInstanceByField(
    MedicalFileModel,
    "patient_uid",
    patient_uid
  );

  if (!existing_file)
    throw new Error("No file found for the given patient_uid");
  if (existing_file.patient_uid !== patient_uid)
    throw new Error("patient_uid provided doesn't match with one on the file");

  const med_file = new MedicalFile(existing_file);

  let requests = med_file.getRequests().doctors_requests;
  const formatted_req = [];

  for (const req of requests) {
    const doc = await dbInstance.checkInstanceByField(
      DocModel,
      "doctor_uid",
      req.doctor_uid
    );

    const doc_obj = new Doctor(doc);

    let new_req = {
      doctor: doc_obj.toRequestsJson(),
      time: req.time,
    };
    formatted_req.push(new_req);
  }

  return formatted_req;
};

module.exports = getRequests;
