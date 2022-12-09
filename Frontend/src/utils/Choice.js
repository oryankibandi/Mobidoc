export const CheckValidity = (first_name,
  last_name,
  middle_name,
  national_id,
  email,
  phone_number,
  address_country,
  address_county,
  address_city,
  address_street,
    role, updateError) => {
    if (
        !first_name ||
        !last_name ||
        !middle_name ||
        !national_id ||
        !email ||
        !phone_number ||
        !address_country ||
        !address_county ||
        !address_city ||
        !address_street ||
        !role
    ) {
        updateError("choice_err", "warning", true, "All fields are required.");
        return true;
    }
    if (first_name.length < 3) {
        updateError("choice_err", "warning", true, "First name must be at least 3 letters.");
        return true;
    }
    if (middle_name.length < 3) {
        updateError("choice_err", "warning", true, "Middle name must be at least 3 letters.");
        return true;
    }
    if (last_name.length < 3) {
        updateError("choice_err", "warning", true, "Last name must be at least 3 letters.");
        return true;
    }
    if (phone_number.length < 13) {
        updateError(
            "choice_err",
            "warning",
            true,
            "Phonenumber must be atleast 13 numbers."
        );
        return true;
    }
    if (phone_number.substr(0, 4) !== "+254") {
        updateError(
            "choice_err",
            "warning",
            true,
            "Phonenumber should start with +254."
        );
        return true;
    }
    if (isNaN(Number(phone_number.substr(4, 11)))) {
        updateError(
            "choice_err",
            "warning",
            true,
            "Phonenumber should have numbers only."
        );
        return true;
    }
    if (isNaN(Number(national_id))) {
        updateError(
            "choice_err",
            "warning",
            true,
            "National-id should have numbers only."
        );
        return true;
    }
    if (Number(national_id) < 0) {
        updateError(
            "choice_err",
            "warning",
            true,
            "National-id must be greater than 0."
        );
        return true;
    }
    return false;
}