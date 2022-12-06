const Patient = require("../../entities/patient");

const refreshPatient = async (
  dbInstance,
  jwtInstance,
  PatientModel,
  refresh_token,
  refresh_token_secret
) => {
  const decoded = await jwtInstance.verify(refresh_token, refresh_token_secret);

  const existing_user = await dbInstance.checkInstanceByField(
    PatientModel,
    "phone_number",
    decoded.phone_number
  );

  if (!existing_user) throw new Error("No user found");

  const patient_object = new Patient(existing_user);
  const censored_details = patient_object.toCensoredJson();
  const access_token = await jwtInstance.generateAccessToken(censored_details);

  return access_token;
};

module.exports = refreshPatient;
