const Record = require("../../entities/record");

let record;
describe("Patient Entity", () => {
  const record_details = {
    record_uid: "jkandkjsanjsnksadnkjsa",
    doctor_uid: "doc_akndsandsjadnaskjdnaskjsk",
    symptoms: ["symptom1", "symptom2"],
    date: new Date(Date.now()),
    diagnosis: {
      condition: "condition",
      description: "description of condition",
    },
    medication: [
      {
        name: "med 1",
        dosage: "2*3",
      },
      {
        name: "med 2",
        dosage: "500g every day",
      },
    ],
    patient_uid: "pat_nanakdalksasmaaksamkmaklmdk",
    record_hash: "aandsansndsandsakdsakdasdak",
  };
  beforeEach(() => {
    record = new Record(record_details);
    record.prepend();
  });

  it("patient_uid is a string", () => {
    const rec_uid = record.record_uid;

    expect(typeof rec_uid).toBe("string");
  });

  it("record_uid starts with `red`", () => {
    expect(record.record_uid).toMatch(/^red/);
  });

  it("toFormattedJson returns an object", () => {
    const formatted_json = record.toFormattedJson();
    expect(typeof formatted_json).toBe("object");
  });

  it("toFormattedJson returns a frozen object", () => {
    const formatted_json = record.toFormattedJson();
    formatted_json.word = "asa";

    expect(formatted_json.word).toBeFalsy();
  });

  it("toFormattedJson returns the correct object", () => {
    const expected_json = Object.freeze({
      record_uid: record.record_uid,
      record_hash: record.record_hash,
      doctor_uid: record.doctor_uid,
      patient_uid: record.patient_uid,
      date: record.date,
      symptoms: record.symptoms,
      diagnosis: record.diagnosis,
      medication: record.medication,
    });
    const formatted_json = record.toFormattedJson();

    expect(formatted_json).toEqual(expected_json);
  });

  it("toCensoredJson returns an object", () => {
    const formatted_json = record.toCensoredJson();
    expect(typeof formatted_json).toBe("object");
  });

  it("toCensoredJson returns a frozen object", () => {
    const formatted_json = record.toCensoredJson();
    formatted_json.word = "asa";

    expect(formatted_json.word).toBeFalsy();
  });

  it("toCensoredJson returns the correct object", () => {
    const expected_json = Object.freeze({
      record_uid: record.record_uid,
      doctor_uid: record.doctor_uid,
      patient_uid: record.patient_uid,
      date: record.date,
      symptoms: record.symptoms,
      diagnosis: record.diagnosis,
      medication: record.medication,
    });
    const censored_json = record.toCensoredJson();

    expect(censored_json).toEqual(expected_json);
  });
});
