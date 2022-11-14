const Patient = require("../../entities/patient");
const recordsUseCaseInterface = require("../records/recordsUseCaseInterface");

const createPatient = async (
  cryptographyInstance,
  dbInstance,
  PatientModel,
  RecordModel,
  roles,
  patientDetails
) => {
  const existing_id = await dbInstance.checkInstanceByField(
    PatientModel,
    "national_id",
    patientDetails.national_id
  );

  if (existing_id) throw new Error("National ID already registered");

  const existing_phone = await dbInstance.checkInstanceByField(
    PatientModel,
    "phone_number",
    patientDetails.phone_number
  );

  if (existing_phone) throw new Error("Phone already registered");

  patientDetails.patient_uid = cryptographyInstance.generateUUID();
  patientDetails.role = roles.patient;

  patientDetails.hashed_password = cryptographyInstance.hash(
    patientDetails.password
  );
  const new_patient = new Patient(patientDetails);
  new_patient.prepend();

  const new_record = await recordsUseCaseInterface.createRecord(
    dbInstance,
    cryptographyInstance,
    RecordModel,
    new_patient.toCensoredJson().patient_uid
  );

  new_patient.addRecordUid(new_record.record_uid);

  await dbInstance.makeEntry(PatientModel, new_patient.toFormattedJson());

  return new_patient.toCensoredJson();
};

module.exports = createPatient;
