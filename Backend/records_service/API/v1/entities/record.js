class Record {
  constructor(recordDetails) {
    this.validate(recordDetails);

    this.record_uid = recordDetails.record_uid;
    this.patient_uid = recordDetails.patient_uid;
    this.doctors_with_access = recordDetails.doctors_with_access ?? [];
    this.records = recordDetails.records ?? [];
  }

  validate(recordDetails) {
    if (!recordDetails.record_uid) throw new Error("record_uid not provided");
    if (!recordDetails.patient_uid) throw new Error("patient_uid not provided");
  }

  prepend() {
    this.record_uid = "rec".concat("_", this.record_uid);
  }

  toFormattedJson() {
    return Object.freeze({
      record_uid: this.record_uid,
      patient_uid: this.patient_uid,
      doctors_with_access: this.doctors_with_access,
      records: this.records,
    });
  }

  getSummary() {
    return Object.freeze({
      record_uid: this.record_uid,
      patient_uid: this.patient_uid,
    });
  }
}

module.exports = Record;
