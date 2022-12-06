const Doctor = require("../../entities/doctor");

const refreshDoctor = async (
  dbInstance,
  jwtInstance,
  DocModel,
  refresh_token,
  refresh_token_secret
) => {
  jwtInstance.on("invalidToken", (error) => {
    throw new Error(error.message);
  });

  const decoded = await jwtInstance.verify(refresh_token, refresh_token_secret);

  const existing_user = await dbInstance.checkInstanceByField(
    DocModel,
    "email",
    decoded.email
  );

  if (!existing_user) throw new Error("No user found");

  const doctor_object = new Doctor(existing_user);
  const censored_details = doctor_object.toCensoredJson();
  const access_token = await jwtInstance.generateAccessToken(censored_details);

  return access_token;
};

module.exports = refreshDoctor;
