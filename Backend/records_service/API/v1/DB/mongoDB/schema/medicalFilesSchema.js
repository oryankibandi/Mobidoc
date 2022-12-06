const mongoose = require("mongoose");

const { Schema } = mongoose;

const medicalFilesSchema = Schema({
  med_file_uid: { type: String, required: true },
  created_at: { type: String, required: true, default: new Date(Date.now()) },
  patient_uid: { type: String, required: true },
  doctors_with_access: [
    {
      doctor_uid: { type: String },
      access_token: { type: String },
    },
  ],
  doctors_requests: [
    {
      doctor_uid: { type: String },
      time: { type: Date, default: new Date(Date.now()) },
    },
  ],
  records: [
    {
      record_uid: { type: String, required: true },
      date: { type: Date, required: true },
    },
  ],
});

module.exports = mongoose.model("MedicalFiles", medicalFilesSchema);
