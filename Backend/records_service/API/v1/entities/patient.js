class Patient {
  constructor(patientDetails) {
    this.validate(patientDetails);
    this.first_name = patientDetails.first_name;
    this.last_name = patientDetails.last_name;
    this.middle_name = patientDetails.middle_name;
    this.patient_uid = patientDetails.patient_uid;
    this.national_id = patientDetails.national_id;
    this.role = patientDetails.role;
    this.chat_uid = patientDetails.chat_uid ?? null;
    this.med_file_uid = patientDetails.med_file_uid;
    this.email = patientDetails.email;
    this.phone_number = patientDetails.phone_number;
    this.address = patientDetails.address;
    this.next_of_kin = patientDetails.next_of_kin;
    this.hashed_password = patientDetails.hashed_password;
  }

  validate(patientDetails) {
    if (!patientDetails.first_name) throw new Error("first_name not provided");
    if (!patientDetails.last_name) throw new Error("last_name not provided");
    if (!patientDetails.middle_name)
      throw new Error("middle_name not provided");
    if (!patientDetails.patient_uid)
      throw new Error("patient_uid not provided");
    if (!patientDetails.national_id)
      throw new Error("national_id not provided");
    if (!patientDetails.role) throw new Error("role not provided");
    // if (!patientDetails.med_file_uid) throw new Error("med_file_uid not provided");
    if (!patientDetails.email) throw new Error("email not provided");
    if (!patientDetails.phone_number)
      throw new Error("phone_number not provided");
    if (!patientDetails.address) throw new Error("address not provided");
    if (!patientDetails.next_of_kin)
      throw new Error("next_of_kin not provided");
    if (!patientDetails.hashed_password)
      throw new Error("hashed_password not provided");
  }

  prepend() {
    this.patient_uid = "pat".concat("_", this.patient_uid);
  }

  addRecordUid(med_file_uid) {
    this.med_file_uid = med_file_uid;
  }

  toFormattedJson() {
    return Object.freeze({
      first_name: this.first_name,
      last_name: this.last_name,
      middle_name: this.middle_name,
      patient_uid: this.patient_uid,
      national_id: this.national_id,
      role: this.role,
      chat_uid: this.chat_uid,
      med_file_uid: this.med_file_uid,
      email: this.email,
      phone_number: this.phone_number,
      address: this.address,
      next_of_kin: this.next_of_kin,
      hashed_password: this.hashed_password,
    });
  }

  toCensoredJson() {
    return Object.freeze({
      first_name: this.first_name,
      last_name: this.last_name,
      middle_name: this.middle_name,
      patient_uid: this.patient_uid,
      role: this.role,
      email: this.email,
      phone_number: this.phone_number,
    });
  }
}

module.exports = Patient;
