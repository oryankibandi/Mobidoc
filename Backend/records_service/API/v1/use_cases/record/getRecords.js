const Record = require("../../entities/record");

const getRecords = async (dbInstance, RecordModel, filters) => {
  let filtered_query = {};
  for (const [key, value] of Object.entries(filters)) {
    let re = new RegExp(`^${value}`);
    filtered_query[`${key}`] = { $regex: re, $options: "i" };
  }

  const results = await dbInstance.findMany(RecordModel, filtered_query);

  if (results.length > 0) {
    let formatted_results = [];
    results.forEach((record) => {
      let new_record = new Record(record);
      formatted_results.push(new_record.toCensoredJson());
    });

    return formatted_results;
  }

  return results;
};

module.exports = getRecords;
