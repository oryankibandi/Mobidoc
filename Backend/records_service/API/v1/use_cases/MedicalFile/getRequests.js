const MedicalFile = require("../../entities/medicalFile");

const getRequests = async (dbInstance, MedicalFileModel, patient_uid) => {
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

  requests.forEach((req) => {
    let new_req = {
      doctor_uid: req.doctor_uid,
      time: req.time,
    };
    formatted_req.push(new_req);
  });

  return formatted_req;
};

module.exports = getRequests;
