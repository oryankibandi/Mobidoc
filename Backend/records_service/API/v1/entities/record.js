class Record {
  constructor(recordDetails) {
    this.validate();

    this.record_uid = recordDetails.record_uid;
    this.patient_uid = recordDetails.patient_uid;
    this.doctors_with_access = recordDetails.doctors_with_access ?? [];
    this.records = recordDetails.records ?? [];
  }

  validate(recordDetails) {
    if (recordDetails.record_uid) throw new Error("record_uid not provided");
    if (recordDetails.patient_uid) throw new Error("patient_uid not provided");
  }
}

module.exports = Record;
