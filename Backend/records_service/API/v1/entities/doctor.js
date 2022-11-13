class Doctor {
  constructor(docDetails) {
    this.validate(docDetails);
    this.first_name = docDetails.first_name;
    this.last_name = docDetails.last_name;
    this.doctor_uid = docDetails.doctor_uid;
    this.national_id = docDetails.national_id;
    this.role = docDetails.role;
    this.username = docDetails.username;
    this.email = docDetails.email;
    this.address = docDetails.address;
    this.place_of_work = docDetails.place_of_work;
    this.area_of_specialty = docDetails.area_of_specialty;
  }

  validate(docDetails) {
    if (!docDetails.first_name) throw new Error("first_name not provided");
    if (!docDetails.last_name) throw new Error("last_name not provided");
    if (!docDetails.doctor_uid) throw new Error("doctor_uid not provided");
    if (!docDetails.national_id) throw new Error("national_id not provided");
    if (!docDetails.role) throw new Error("role not provided");
    if (!docDetails.username) throw new Error("username not provided");
    if (!docDetails.email) throw new Error("email not provided");
    if (!docDetails.address) throw new Error("address not provided");
    if (!docDetails.place_of_work)
      throw new Error("place_of_work not provided");
    if (!docDetails.area_of_specialty)
      throw new Error("area_of_specialty not provided");
  }
}

module.exports = Doctor;
