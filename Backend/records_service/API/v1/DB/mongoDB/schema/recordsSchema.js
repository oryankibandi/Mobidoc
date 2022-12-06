const mongoose = require("mongoose");

const { Schema } = mongoose;

const recordsSchema = Schema({
  record_uid: { type: String, required: true },
  record_hash: { type: String, required: true },
  doctor_uid: { type: String, required: true },
  patient_uid: { type: String, required: true },
  date: { type: Date, required: true, default: new Date(Date.now()) },
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
});

module.exports = mongoose.model("Record", recordsSchema);
