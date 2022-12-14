const Patient = require("../../entities/patient");

const getPatients = async (
  dbInstance,
  PatientModel,
  filters,
  page = 1,
  count = 10
) => {
  let filtered_query = {};
  for (const [key, value] of Object.entries(filters)) {
    let re = new RegExp(`^${value}`);
    filtered_query[`${key}`] = { $regex: re, $options: "i" };
  }

  const data = await dbInstance.findMany(PatientModel, filtered_query);
  const entries = data.length;

  if (data.length > 0) {
    let results = [];
    let formatted_data = {};
    let starting_index = (page - 1) * count;
    let final_index = starting_index + count;
    const final_results = data.slice(starting_index, final_index);
    final_results.forEach((item) => {
      let new_doc = new Patient(item);
      results.push(new_doc.toCensoredJson());
    });

    formatted_data.results = results;
    formatted_data.total = entries;
    if (starting_index > 0) {
      formatted_data.previous = parseInt(page) - 1;
    }

    if (final_index < entries) {
      formatted_data.next = parseInt(page) + 1;
    }

    return formatted_data;
  }

  return data;
};

module.exports = getPatients;
