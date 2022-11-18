class Record {
  constructor(recordData) {
    this.validate(recordData);
    this.record_uid = recordData.record_uid;
    this.record_hash = recordData.record_hash;
    this.doctor_uid = recordData.doctor_uid;
    this.date = recordData.date ?? new Date(Date.now());
    this.symptoms = recordData.symptoms;
    this.diagnosis = recordData.diagnosis;
    this.medication = recordData.medication;
  }

  validate(recordData) {
    if (!recordData.record_uid) throw new Error("record_uid not provided");
    if (!recordData.record_hash) throw new Error("record_hash not provided");
    if (!recordData.doctor_uid) throw new Error("doctor_uid not provided");
    if (!recordData.symptoms) throw new Error("symptoms not provided");
    if (!recordData.diagnosis) throw new Error("diagnosis not provided");
    if (!recordData.medication) throw new Error("medication not provided");
  }

  prepend() {
    this.record_uid = "red".concat("_", this.record_uid);
  }

  toFormattedJson() {
    return Object.freeze({
      record_uid: this.record_uid,
      record_hash: this.record_hash,
      doctor_uid: this.doctor_uid,
      date: this.date,
      symptoms: this.symptoms,
      diagnosis: this.diagnosis,
      medication: this.medication,
    });
  }

  toCensoredJson() {
    return Object.freeze({
      record_uid: this.record_uid,
      doctor_uid: this.doctor_uid,
      date: this.date,
      symptoms: this.symptoms,
      diagnosis: this.diagnosis,
      medication: this.medication,
    });
  }

  getSummary() {
    return Object.freeze({
      record_uid: this.record_uid,
      date: this.date,
    });
  }
}

module.exports = Record;
