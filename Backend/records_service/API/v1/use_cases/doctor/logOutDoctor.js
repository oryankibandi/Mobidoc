const logOutDoctor = async (
  dbInstance,
  refresh_token,
  DocModel,
  jwtInstance,
  refresh_token_secret
) => {
  const decoded_doctor = await jwtInstance.verify(
    refresh_token,
    refresh_token_secret
  );

  const existing_doctor = await dbInstance.checkInstanceByField(
    DocModel,
    "email",
    decoded_doctor.email
  );

  if (!existing_doctor) throw new Error("No User found");

  dbInstance.findOneAndUpdate(
    DocModel,
    { email: decoded_doctor.email },
    { refresh_token: null }
  );
};

module.exports = logOutDoctor;
