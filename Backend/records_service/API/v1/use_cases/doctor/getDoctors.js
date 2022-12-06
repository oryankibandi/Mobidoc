const Doctor = require("../../entities/doctor");

const getDoctors = async (
  dbInstance,
  DocModel,
  MedicalFileModel,
  filters,
  page = 1,
  count = 10,
  patientUid = null
) => {
  let filtered_query = {};
  for (const [key, value] of Object.entries(filters)) {
    let re = new RegExp(`^${value}`);
    if (key === "country") {
      filtered_query[`address.country`] = { $regex: re, $options: "i" };
    } else {
      filtered_query[`${key}`] = { $regex: re, $options: "i" };
    }
  }

  let patient_medical_file;
  let doctors_with_access;
  if (patientUid) {
    patient_medical_file = await dbInstance.checkInstanceByField(
      MedicalFileModel,
      "patient_uid",
      patientUid
    );

    doctors_with_access = patient_medical_file.doctors_with_access.map(
      (doct) => doct.doctor_uid
    );
  }
  const data = await dbInstance.findMany(DocModel, filtered_query);

  const entries = data.length;
  if (data.length > 0) {
    let results = [];
    let formatted_data = {};
    let starting_index = (page - 1) * count;
    let final_index = starting_index + count;
    const final_results = data.slice(starting_index, final_index);
    final_results.forEach((item) => {
      let new_doc = new Doctor(item);
      results.push(new_doc.toCensoredJson());
    });

    if (patientUid) {
      const formatted_results = [];
      results.forEach((res) => {
        if (doctors_with_access.includes(res.doctor_uid)) {
          let doc = {
            doctor: res,
            has_access: true,
          };
          formatted_results.push(doc);
        } else {
          let doc = {
            doctor: res,
            has_access: false,
          };
          formatted_results.push(doc);
        }
      });

      formatted_data.results = formatted_results;
    } else {
      formatted_data.results = results;
    }

    formatted_data.total = entries;
    if (starting_index > 0) {
      formatted_data.previous = parseInt(page) - 1;
    } else {
      formatted_data.previous = null;
    }

    if (final_index < entries) {
      formatted_data.next = parseInt(page) + 1;
    } else {
      formatted_data.next = null;
    }

    return formatted_data;
  }

  return data;
};

module.exports = getDoctors;
