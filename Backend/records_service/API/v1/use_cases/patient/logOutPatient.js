const logOutPatient = async (
  dbInstance,
  refresh_token,
  PatientModel,
  jwtInstance,
  refresh_token_secret
) => {
  const decoded_patient = await jwtInstance.verify(
    refresh_token,
    refresh_token_secret
  );

  const existing_patient = await dbInstance.checkInstanceByField(
    PatientModel,
    "phone_number",
    decoded_patient.phone_number
  );

  if (!existing_patient) throw new Error("No patient found");

  dbInstance.findOneAndUpdate(
    PatientModel,
    { phone_number: decoded_patient.phone_number },
    { refresh_token: null }
  );
};

module.exports = logOutPatient;
