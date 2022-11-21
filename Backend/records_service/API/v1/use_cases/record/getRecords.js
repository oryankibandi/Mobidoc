const e = require("express");
const Record = require("../../entities/record");

const getRecords = async (
  dbInstance,
  RecordModel,
  filters,
  page = 1,
  count = 10
) => {
  let filtered_query = {};
  for (const [key, value] of Object.entries(filters)) {
    if (key === "date") {
      filtered_query[`${key}`] = value;
    } else {
      let re = new RegExp(`^${value}`);
      filtered_query[`${key}`] = { $regex: re, $options: "i" };
    }
  }

  try {
    const query_results = await dbInstance.findMany(
      RecordModel,
      filtered_query
    );
    const entries = query_results.length;

    if (query_results.length > 0) {
      let results = [];
      let formatted_data = {};
      let starting_index = (page - 1) * count;
      let final_index = starting_index + count;
      const final_results = query_results.slice(starting_index, final_index);
      final_results.forEach((record) => {
        let new_record = new Record(record);
        results.push(new_record.toCensoredJson());
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

    return results;
  } catch (error) {
    throw error;
  }
};

module.exports = getRecords;
