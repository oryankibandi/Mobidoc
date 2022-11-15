const Doctor = require("../../entities/doctor");

const getDoctors = async (dbInstance, DocModel, filters) => {
  let filtered_query = {};
  for (const [key, value] of Object.entries(filters)) {
    let re = new RegExp(`^${value}`);
    if (key === "country") {
      filtered_query[`address.country`] = { $regex: re, $options: "i" };
    } else {
      filtered_query[`${key}`] = { $regex: re, $options: "i" };
    }
  }

  const data = await dbInstance.findMany(DocModel, filtered_query);
  if (data.length > 0) {
    let formatted_data = [];
    data.forEach((item) => {
      let new_doc = new Doctor(item);
      formatted_data.push(new_doc.toCensoredJson());
    });

    return formatted_data;
  }

  return data;
};

module.exports = getDoctors;
