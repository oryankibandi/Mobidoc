const Doctor = require("../../entities/doctor");

/**
 * `authenticateDoctor` - Authenticates a doctor and generates access and refresh tokens
 * @param {object} dbInstance
 * @param {object} cryptographyInstance
 * @param {object} jwtInstance
 * @param {object} DocModel
 * @param {Object} docDetails
 */
const authenticateDoctor = async (
  dbInstance,
  cryptographyInstance,
  jwtInstance,
  DocModel,
  docDetails
) => {
  const existing_doctor = await dbInstance.checkInstanceByField(
    DocModel,
    "email",
    docDetails.email
  );

  if (!existing_doctor) throw new Error("No account found for the given email");

  const rehashed_password = cryptographyInstance.hash(docDetails.password);

  if (rehashed_password !== existing_doctor.hashed_password) {
    throw new Error("Invalid email or password");
  }

  const doctor = new Doctor(existing_doctor);
  const censored_details = doctor.toCensoredJson();
  const access_token = jwtInstance.generateAccessToken(censored_details);
  const refresh_token = jwtInstance.generateRefreshToken(censored_details);

  await dbInstance.findOneAndUpdate(
    DocModel,
    { email: censored_details.email },
    { refresh_token: refresh_token }
  );

  return {
    user: censored_details,
    access_token: access_token,
    refresh_token: refresh_token,
  };
};

module.exports = authenticateDoctor;
