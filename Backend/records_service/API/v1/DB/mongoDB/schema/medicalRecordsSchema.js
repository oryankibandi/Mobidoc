const mongoose = require("mongoose");

const { Schema } = mongoose;

const medicalRecordsSchema = Schema({
  record_uid: { type: String, required: true },
  patient_uid: { type: String, required: true },
  doctors_with_access: [
    {
      doctor_uid: { type: String },
      access_token: { type: String },
    },
  ],
  records: [
    {
      doctor_uid: { type: String, required: true },
      date: { type: Date, required: true, default: Date.now() },
      symptoms: [{ type: String, required: true }],
      diagnosis: {
        condition: { type: String, required: true },
        description: { type: String, required: true },
      },
      medication: [
        {
          name: { type: String },
          dosage: { type: String },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("MedicalRecordsSchema", medicalRecordsSchema);
