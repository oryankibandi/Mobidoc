
const CheckRegistration = (
  next_of_kin_first_name,
  next_of_kin_last_name,
  next_of_kin_middle_name,
  next_of_kin_relationship,
  next_of_kin_phone_number,
  phone_number,
  retype_password,
  username,
  password,
  place_of_work,
  area_of_specialty,
  role,
  updateError
) => {
  if (role === "patient") {
    if (
      !next_of_kin_first_name ||
      !next_of_kin_last_name ||
      !next_of_kin_middle_name ||
      !next_of_kin_relationship ||
      !next_of_kin_phone_number ||
      !retype_password ||
      !password
    ) {
      updateError("register_err", "warning", true, "All fields are required");
      return true;
      }
      if (next_of_kin_first_name.length < 3) {
          updateError("register_err", "warning", true, "First name must be at least 3 letters");
      return true;
      }
      if (next_of_kin_middle_name.length < 3) {
          updateError("register_err", "warning", true, "Middle name must be at least 3 letters");
      return true;
      }
      if (next_of_kin_last_name.length < 3) {
        updateError(
          "register_err",
          "warning",
          true,
          "Last name must be at least 3 letters"
        );
        return true;
      }
        if (next_of_kin_phone_number.length < 13) {
          updateError(
            "register_err",
            "warning",
            true,
            "Phonenumber must be atleast 13 numbers."
          );
          return true;
        }
    if (next_of_kin_phone_number.substr(0, 4) !== "+254") {
      updateError(
        "register_err",
        "warning",
        true,
        "Phonenumber should start with +254."
      );
      return true;
    }
    if (isNaN(Number(next_of_kin_phone_number.substr(4, 11)))) {
      updateError(
        "register_err",
        "warning",
        true,
        "Phonenumber should have numbers only."
      );
      return true;
    }
    if (phone_number === next_of_kin_phone_number) {
      updateError(
        "register_err",
        "warning",
        true,
        "Please enter next of kin phonenumber."
      );
      return true;
    }
  } else {
    if (
      !retype_password ||
      !username ||
      !password ||
      !place_of_work ||
      !area_of_specialty
    ) {
      updateError("register_err", "warning", true, "All fields are required");
      return true;
      }
      if (username.length < 6) {
          updateError("register_err", "warning", true, "Username must be at least 6 characters");
      return true;
      }
  }

  if (password.length < 8) {
    updateError(
      "register_err",
      "warning",
      true,
      "Passwords must be at least 8 characters"
    );
    return true;
  }
  if (password !== retype_password) {
    updateError("register_err", "warning", true, "Passwords do not match");
    return true;
  }
  return false;
};
const CheckLogin = (phone_number, email, password, role, updateError) => {
  if (role === "patient") {
    if (!phone_number || !password) {
      updateError("login_err", "warning", true, "All fields are required");
      return true;
    }if (phone_number.length < 13) {
      updateError(
        "login_err",
        "warning",
        true,
        "Phonenumber must be atleast 13 numbers."
      );
      return true;
    }
    if (phone_number.substr(0, 4) !== "+254") {
      updateError(
        "login_err",
        "warning",
        true,
        "Phonenumber should start with +254."
      );
      return true;
    }
    if (isNaN(Number(phone_number.substr(4, 11)))) {
      updateError(
        "login_err",
        "warning",
        true,
        "Phonenumber should have numbers only."
      );
      return true;
    }
  } else {
    if (!email || !password) {
      updateError("login_err", "warning", true, "All fields are required");
      return true;
    }
    }
    if (password.length < 8) {
      updateError(
        "login_err",
        "warning",
        true,
        "Passwords must be at least 8 characters"
      );
      return true;
    }
  return false;
};

export {CheckRegistration,CheckLogin}