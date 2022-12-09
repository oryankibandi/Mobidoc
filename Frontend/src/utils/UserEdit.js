export const CheckEdit = (
  first_name,
  last_name,
  middle_name,
  national_id,
  email,
  username,
  phone_number,
  address_country,
  address_county,
  address_city,
  address_street,
  next_of_kin_first_name,
  next_of_kin_last_name,
  next_of_kin_middle_name,
  next_of_kin_relationship,
  next_of_kin_phone_number,
  place_of_work,
  area_of_specialty,
  role,
  updateError
) => {
if (
  !first_name ||
  !last_name ||
  !national_id ||
  !email ||
  !address_country  ||
  !address_city ||
  !address_street
) {
  updateError("edit_err", "warning", true, "All fields are required.");
  return true;
}
if (first_name.length < 3) {
  updateError(
    "edit_err",
    "warning",
    true,
    "First name must be at least 3 letters."
  );
  return true;
}

if (last_name.length < 3) {
  updateError(
    "edit_err",
    "warning",
    true,
    "Last name must be at least 3 letters."
  );
  return true;
}

if (isNaN(Number(national_id))) {
  updateError(
    "edit_err",
    "warning",
    true,
    "National-id should have numbers only."
  );
  return true;
}
if (Number(national_id) < 0) {
  updateError(
    "edit_err",
    "warning",
    true,
    "National-id must be greater than 0."
  );
  return true;
}
  if (role === "patient") {
    if (
      !next_of_kin_first_name ||
      !next_of_kin_last_name ||
      !next_of_kin_middle_name ||
      !next_of_kin_relationship ||
      !next_of_kin_phone_number ||
      !phone_number ||
      middle_name ||
      !address_county
    ) {
      updateError("edit_err", "warning", true, "All fields are required");
      return true;
    }
    if (middle_name.length < 3) {
      updateError(
        "edit_err",
        "warning",
        true,
        "Middle name must be at least 3 letters."
      );
      return true;
    }
    if (phone_number.length < 13) {
      updateError(
        "edit_err",
        "warning",
        true,
        "Phonenumber must be atleast 13 numbers."
      );
      return true;
    }
    if (phone_number.substr(0, 4) !== "+254") {
      updateError(
        "edit_err",
        "warning",
        true,
        "Phonenumber should start with +254."
      );
      return true;
    }
    if (isNaN(Number(phone_number.substr(4, 11)))) {
      updateError(
        "edit_err",
        "warning",
        true,
        "Phonenumber should have numbers only."
      );
      return true;
    }
    if (next_of_kin_first_name.length < 3) {
      updateError(
        "edit_err",
        "warning",
        true,
        "First name must be at least 3 letters"
      );
      return true;
    }
    if (next_of_kin_middle_name.length < 3) {
      updateError(
        "edit_err",
        "warning",
        true,
        "Middle name must be at least 3 letters"
      );
      return true;
    }
    if (next_of_kin_last_name.length < 3) {
      updateError(
        "edit_err",
        "warning",
        true,
        "Last name must be at least 3 letters"
      );
      return true;
    }
    if (next_of_kin_phone_number.length < 13) {
      updateError(
        "edit_err",
        "warning",
        true,
        "Phonenumber must be atleast 13 numbers."
      );
      return true;
    }
    if (next_of_kin_phone_number.substr(0, 4) !== "+254") {
      updateError(
        "edit_err",
        "warning",
        true,
        "Phonenumber should start with +254."
      );
      return true;
    }
    if (isNaN(Number(next_of_kin_phone_number.substr(4, 11)))) {
      updateError(
        "edit_err",
        "warning",
        true,
        "Phonenumber should have numbers only."
      );
      return true;
    }
    if (phone_number === next_of_kin_phone_number) {
      updateError(
        "edit_err",
        "warning",
        true,
        "Please enter next of kin phonenumber."
      );
      return true;
    }
  } else {
    if (!username || !place_of_work || !area_of_specialty) {
      updateError("edit_err", "warning", true, "All fields are required");
      return true;
    }
    if (username.length < 6) {
      updateError(
        "edit_err",
        "warning",
        true,
        "Username must be at least 6 characters"
      );
      return true;
    }
  }
  
  return false;
};
