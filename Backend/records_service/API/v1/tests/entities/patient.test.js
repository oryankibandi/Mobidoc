const Patient = require("../../entities/patient");

let patient;
describe("Patient Entity", () => {
  const patient_details = {
    patient_uid: "ndajndaskdskjndskj",
    first_name: "John",
    last_name: "Doe",
    middle_name: "David",
    national_id: "123640200",
    email: "johndoe@gmail.com",
    phone_number: "+254123650399",
    role: 56332,
    address: {
      country: "Rwanda",
      county: "Kigali",
      city: "Kigali",
      street: "Kigali street",
    },
    next_of_kin: {
      first_name: "Jane",
      last_name: "Doe",
      middle_name: "David",
      phone_number: "+254862126480",
      relationship: "sibling",
    },
    hashed_password: "abcdcd123@A",
    refreshToken: null,
  };

  beforeEach(() => {
    patient = new Patient(patient_details);
    patient.prepend();
  });

  it("patient_uid is a string", () => {
    const pat_uid = patient.patient_uid;

    expect(typeof pat_uid).toBe("string");
  });

  it("patient_uid starts with `pat`", () => {
    expect(patient.patient_uid).toMatch(/^pat/);
  });

  it("toFormattedJson returns an object", () => {
    const formatted_json = patient.toFormattedJson();
    expect(typeof formatted_json).toBe("object");
  });

  it("toFormattedJson returns a frozen object", () => {
    const formatted_json = patient.toFormattedJson();
    formatted_json.word = "asa";

    expect(formatted_json.word).toBeFalsy();
  });

  it("toFormattedJson returns the correct object", () => {
    const expected_json = Object.freeze({
      first_name: patient.first_name,
      last_name: patient.last_name,
      middle_name: patient.middle_name,
      patient_uid: patient.patient_uid,
      national_id: patient.national_id,
      role: patient.role,
      chat_uid: patient.chat_uid,
      med_file_uid: patient.med_file_uid,
      email: patient.email,
      phone_number: patient.phone_number,
      address: patient.address,
      next_of_kin: patient.next_of_kin,
      hashed_password: patient.hashed_password,
    });
    const formatted_json = patient.toFormattedJson();

    expect(formatted_json).toEqual(expected_json);
  });

  it("toCensoredJson returns an object", () => {
    const formatted_json = patient.toCensoredJson();
    expect(typeof formatted_json).toBe("object");
  });

  it("toCensoredJson returns a frozen object", () => {
    const formatted_json = patient.toCensoredJson();
    formatted_json.word = "asa";

    expect(formatted_json.word).toBeFalsy();
  });

  it("toCensoredJson returns the correct object", () => {
    const expected_json = Object.freeze({
      first_name: patient.first_name,
      last_name: patient.last_name,
      middle_name: patient.middle_name,
      patient_uid: patient.patient_uid,
      role: patient.role,
      email: patient.email,
      phone_number: patient.phone_number,
    });
    const censored_json = patient.toCensoredJson();

    expect(censored_json).toEqual(expected_json);
  });

  it("toProfileJson returns an object", () => {
    const formatted_json = patient.toProfileJson();
    expect(typeof formatted_json).toBe("object");
  });

  it("toProfileJson returns a frozen object", () => {
    const formatted_json = patient.toProfileJson();
    formatted_json.word = "asa";

    expect(formatted_json.word).toBeFalsy();
  });

  it("toProfileJson returns the correct object", () => {
    const expected_json = Object.freeze({
      first_name: patient.first_name,
      last_name: patient.last_name,
      middle_name: patient.middle_name,
      patient_uid: patient.patient_uid,
      national_id: patient.national_id,
      role: patient.role,
      chat_uid: patient.chat_uid,
      med_file_uid: patient.med_file_uid,
      email: patient.email,
      phone_number: patient.phone_number,
      address: patient.address,
      next_of_kin: patient.next_of_kin,
    });
    const censored_json = patient.toProfileJson();

    expect(censored_json).toEqual(expected_json);
  });
});
