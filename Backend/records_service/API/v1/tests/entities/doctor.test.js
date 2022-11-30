const Doctor = require("../../entities/doctor");

let doc;
describe("Doctor Entity", () => {
  const doc_details = {
    doctor_uid: "dasjdaskdsajdsadkjsadkjsaaajjasjd",
    first_name: "Martin",
    last_name: "Maina",
    national_id: "987654321",
    username: "Dr. Martin",
    email: "mainmartin@gmail.com",
    role: 36512,
    address: {
      country: "Kenya",
      city: "Nairobi",
      street: "Upperhill",
    },
    place_of_work: "Mobidoc Hospital",
    area_of_specialty: "Surgeon",
    hashed_password: "abcdcd123@A",
    refreshToken: null,
  };

  beforeEach(() => {
    doc = new Doctor(doc_details);
    doc.prepend();
  });

  it("doctor_uid is a string", () => {
    const doc_uid = doc.doc_uid;

    expect(typeof doc_uid).toBe("string");
  });

  it("doctor_uid starts with `doc`", () => {
    expect(doc.doc_uid).toMatch(/^doc/);
  });

  it("toFormattedJson returns an object", () => {
    const formatted_json = doc.toFormattedJson();
    expect(typeof formatted_json).toBe("object");
  });

  it("toFormattedJson returns a frozen object", () => {
    const formatted_json = doc.toFormattedJson();
    formatted_json.word = "asa";

    expect(formatted_json.word).toBeFalsy();
  });

  it("toFormattedJson returns the correct object", () => {
    const expected_json = Object.freeze({
      first_name: doc.first_name,
      last_name: doc.last_name,
      doctor_uid: doc.doctor_uid,
      national_id: doc.national_id,
      role: doc.role,
      username: doc.username,
      email: doc.email,
      address: doc.address,
      place_of_work: doc.place_of_work,
      area_of_specialty: doc.area_of_specialty,
      hashed_password: doc.hashed_password,
    });
    const formatted_json = doc.toFormattedJson();

    expect(formatted_json).toEqual(expected_json);
  });

  it("toCensoredJson returns an object", () => {
    const formatted_json = doc.toCensoredJson();
    expect(typeof formatted_json).toBe("object");
  });

  it("toCensoredJson returns a frozen object", () => {
    const formatted_json = doc.toCensoredJson();
    formatted_json.word = "asa";

    expect(formatted_json.word).toBeFalsy();
  });

  it("toCensoredJson returns the correct object", () => {
    const expected_json = Object.freeze({
      first_name: doc.first_name,
      last_name: doc.last_name,
      doctor_uid: doc.doctor_uid,
      role: doc.role,
      username: doc.username,
      email: doc.email,
      national_id: doc.national_id,
    });
    const censored_json = doc.toCensoredJson();

    expect(censored_json).toEqual(expected_json);
  });
  it("toProfileJson returns an object", () => {
    const formatted_json = doc.toProfileJson();
    expect(typeof formatted_json).toBe("object");
  });

  it("toProfileJson returns a frozen object", () => {
    const formatted_json = doc.toProfileJson();
    formatted_json.word = "asa";

    expect(formatted_json.word).toBeFalsy();
  });

  it("toProfileJson returns the correct object", () => {
    const expected_json = Object.freeze({
      first_name: doc.first_name,
      last_name: doc.last_name,
      doctor_uid: doc.doctor_uid,
      national_id: doc.national_id,
      role: doc.role,
      username: doc.username,
      email: doc.email,
      address: doc.address,
      place_of_work: doc.place_of_work,
      area_of_specialty: doc.area_of_specialty,
    });
    const censored_json = doc.toProfileJson();

    expect(censored_json).toEqual(expected_json);
  });
});
