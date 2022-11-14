const Patient = require("../../entities/patient");

/**
 * `authenticateDoctor` - Authenticates a doctor and generates access and refresh tokens
 * @param {object} dbInstance - instance of the database
 * @param {object} cryptographyInstance - instance of the cryptography class
 * @param {object} jwtInstance - instance of the JWT class
 * @param {object} PatientModel - Schema of the Patient
 * @param {Object} patientDetails - a JSON object containing email and password
 */
const authenticatePatient = async (
  dbInstance,
  cryptographyInstance,
  jwtInstance,
  PatientModel,
  patientDetails
) => {
  const existing_patient = await dbInstance.checkInstanceByField(
    PatientModel,
    "phone_number",
    patientDetails.phone_number
  );

  if (!existing_patient)
    throw new Error("No account found for the given phone_number");

  const rehashed_password = cryptographyInstance.hash(patientDetails.password);

  if (rehashed_password !== existing_patient.hashed_password) {
    throw new Error("Invalid phone_number or password");
  }

  const patient = new Patient(existing_patient);
  const censored_details = patient.toCensoredJson();
  const access_token = jwtInstance.generateAccessToken(censored_details);
  const refresh_token = jwtInstance.generateRefreshToken(censored_details);
  await dbInstance.findOneAndUpdate(
    PatientModel,
    { phone_number: censored_details.phone_number },
    { refresh_token: refresh_token }
  );

  return {
    user: censored_details,
    access_token: access_token,
    refresh_token: refresh_token,
  };
};

module.exports = authenticatePatient;
