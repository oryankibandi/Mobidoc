class MedicalFile {
  constructor(recordDetails) {
    this.validate(recordDetails);

    this.med_file_uid = recordDetails.med_file_uid;
    this.patient_uid = recordDetails.patient_uid;
    this.doctors_with_access = recordDetails.doctors_with_access ?? [];
    this.doctors_requests = recordDetails.doctors_requests ?? [];
    this.records = recordDetails.records ?? [];
  }

  validate(recordDetails) {
    if (!recordDetails.med_file_uid)
      throw new Error("med_file_uid not provided");
    if (!recordDetails.patient_uid) throw new Error("patient_uid not provided");
  }

  prepend() {
    this.med_file_uid = "fil".concat("_", this.med_file_uid);
  }

  toFormattedJson() {
    return Object.freeze({
      med_file_uid: this.med_file_uid,
      patient_uid: this.patient_uid,
      doctors_with_access: this.doctors_with_access,
      records: this.records,
    });
  }

  getSummary() {
    return Object.freeze({
      med_file_uid: this.med_file_uid,
      patient_uid: this.patient_uid,
      records: this.records,
    });
  }

  getDoctorsWithAccess() {
    return Object.freeze({
      doctors_with_access: this.doctors_with_access,
    });
  }

  getRequests() {
    return Object.freeze({
      doctors_requests: this.doctors_requests,
    });
  }
}

module.exports = MedicalFile;
