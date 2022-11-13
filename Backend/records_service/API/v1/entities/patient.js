class Patient {
  constructor(patientDetails) {
    this.first_name = patientDetails.first_name;
    this.last_name = patientDetails.last_name;
    this.middle_name = patientDetails.middle_name;
    this.patient_uid = patientDetails.patient_uid;
    this.national_id = patientDetails.national_id;
    this.role = patientDetails.role;
    this.chat_uid = patientDetails.chat_uid;
    this.records_uid = patientDetails.records_uid;
    this.email = patientDetails.email;
    this.phone_number = patientDetails.phone_number;
    this.address = patientDetails.address;
    this.next_of_kin = patientDetails.next_of_kin;
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
    if (!patientDetails.chat_uid) throw new Error("chat_uid not provided");
    if (!patientDetails.records_uid)
      throw new Error("records_uid not provided");
    if (!patientDetails.email) throw new Error("email not provided");
    if (!patientDetails.phone_number)
      throw new Error("phone_number not provided");
    if (!patientDetails.address) throw new Error("address not provided");
    if (!patientDetails.next_of_kin)
      throw new Error("next_of_kin not provided");
  }
}

module.exports = Patient;
