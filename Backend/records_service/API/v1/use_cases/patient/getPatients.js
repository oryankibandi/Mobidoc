const Patient = require("../../entities/patient");

const getPatients = async (dbInstance, PatientModel, filters) => {
  let filtered_query = {};
  for (const [key, value] of Object.entries(filters)) {
    let re = new RegExp(`^${value}`);
    filtered_query[`${key}`] = { $regex: re, $options: "i" };
  }

  const data = await dbInstance.findMany(PatientModel, filtered_query);
  if (data.length > 0) {
    let formatted_data = [];
    data.forEach((item) => {
      let new_doc = new Patient(item);
      formatted_data.push(new_doc.toCensoredJson());
    });

    return formatted_data;
  }

  return data;
};

module.exports = getPatients;
