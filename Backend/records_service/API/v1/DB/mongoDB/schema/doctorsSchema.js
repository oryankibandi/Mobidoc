const mongoose = require("mongoose");

const { Schema } = mongoose;

const doctorsSchema = Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  doctor_uid: { type: String, required: true },
  national_id: { type: String, required: true },
  role: { type: Number, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  address: {
    country: { type: String, required: true, default: "Kenya" },
    city: { type: String, required: true },
    street: { type: String, required: true },
  },
  place_of_work: { type: String, required: true },
  area_of_specialty: { type: String, required: true },
  hashed_password: { type: String, required: true },
  refresh_token: { type: String, required: false, default: null },
});

module.exports = mongoose.model("Doctor", doctorsSchema);
