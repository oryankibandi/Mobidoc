const MedicalFile = require("../../entities/medicalFile");

let med_file;
describe("MedicalFile Entity", () => {
  const med_file_details = {
    med_file_uid: "fil_sdfgvhjhgfdxse566yu",
    patient_uid: "dasjdaskdsajdsadkjsadkjsaaajjasjd",
    created_at: new Date(Date.now()),
    doctors_with_access: [],
    doctors_requests: [],
    records: [],
  };

  beforeEach(() => {
    med_file = new MedicalFile(med_file_details);
    med_file.prepend();
  });

  it("med_file_uid is a string", () => {
    const med_file_uid = med_file.med_file_uid;

    expect(typeof med_file_uid).toBe("string");
  });

  it("med_file_uid starts with `fil`", () => {
    expect(med_file.med_file_uid).toMatch(/^fil/);
  });

  it("toFormattedJson returns an object", () => {
    const formatted_json = med_file.toFormattedJson();
    expect(typeof formatted_json).toBe("object");
  });

  it("toFormattedJson returns a frozen object", () => {
    const formatted_json = med_file.toFormattedJson();
    formatted_json.word = "asa";

    expect(formatted_json.word).toBeFalsy();
  });

  it("toFormattedJson returns the correct object", () => {
    const expected_json = Object.freeze({
      med_file_uid: med_file.med_file_uid,
      patient_uid: med_file.patient_uid,
      doctors_with_access: med_file.doctors_with_access,
      records: med_file.records,
    });
    const formatted_json = med_file.toFormattedJson();

    expect(formatted_json).toEqual(expected_json);
  });

  it("getSummary returns an object", () => {
    const formatted_json = med_file.getSummary();
    expect(typeof formatted_json).toBe("object");
  });

  it("getSummary returns a frozen object", () => {
    const formatted_json = med_file.getSummary();
    formatted_json.word = "asa";

    expect(formatted_json.word).toBeFalsy();
  });

  it("getSummary returns the correct object", () => {
    const expected_json = Object.freeze({
      med_file_uid: med_file.med_file_uid,
      patient_uid: med_file.patient_uid,
      records: med_file.records,
    });
    const censored_json = med_file.getSummary();

    expect(censored_json).toEqual(expected_json);
  });

  it("getDoctorsWithAccess returns an object", () => {
    const formatted_json = med_file.getDoctorsWithAccess();
    expect(typeof formatted_json).toBe("object");
  });

  it("getDoctorsWithAccess returns a frozen object", () => {
    const formatted_json = med_file.getDoctorsWithAccess();
    formatted_json.word = "asa";

    expect(formatted_json.word).toBeFalsy();
  });

  it("getRequests returns an object", () => {
    const formatted_json = med_file.getRequests();
    expect(typeof formatted_json).toBe("object");
  });

  it("getRequests returns a frozen object", () => {
    const formatted_json = med_file.getRequests();
    formatted_json.word = "asa";

    expect(formatted_json.word).toBeFalsy();
  });
});
