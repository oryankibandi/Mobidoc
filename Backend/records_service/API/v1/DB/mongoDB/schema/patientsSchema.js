const mongoose = require("mongoose");

const { Schema } = mongoose;

const patientsSchema = Schema({
  first_name: { type: String, required: true },
  second_name: { type: String, required: true },
  middle_name: { type: String, required: true },
  patient_uid: { type: String, required: true },
  national_id: { type: String, required: true },
  role: { type: Number, required: true },
  chat_uid: { type: String, required: true, default: null },
  records_uid: { type: String, required: true },
  email: { type: String, required: true, default: null },
  phone_number: { type: String, required: true },
  address: {
    country: { type: String, required: true, default: "Kenya" },
    county: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
  },
  next_of_kin: {
    first_name: { type: String, required: true },
    second_name: { type: String, required: true },
    middle_name: { type: String, required: true },
    phone_number: { type: String, required: true },
    relationship: { type: String, required: true },
  },
  refresh_token: { type: String, required: false, default: null },
});

module.exports = mongoose.model("PatientsSchema", patientsSchema);
