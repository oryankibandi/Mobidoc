require("dotenv").config();
const Event = require("node:events");

class MongoDBInstance extends Event {
  constructor() {
    super();
  }

  async checkInstanceByField(Model, field, value) {
    const result = await Model.findOne({ [field]: value }).exec();
    return result;
  }

  async findMany(Model, filters) {
    const results = await Model.find(filters).exec();
    return results;
  }

  async makeEntry(Model, entryObject) {
    try {
      const newModel = await Model.create(entryObject);
      this.emit("entryCreated", newModel);
      return newModel;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async findOneAndUpdate(Model, query, newValueObject) {
    try {
      let updatedObj = await Model.findOneAndUpdate(query, newValueObject);
      this.emit("modelUpdated", updatedObj);
      return updatedObj;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteOne(Model, condition) {
    try {
      Model.deleteOne(condition);
      this.emit("deleted");
    } catch (err) {
      throw new Error("Problem deleting document");
    }
  }

  async getPaginatedResults(Model, filters, page = 1, count = 10) {
    const starting_index = (page - 1) * count;
    const results = await Model.find(filters).skip(starting_index).limit(count);

    return results;
  }

  async count(Model) {
    const count = await Model.find().count();
    return count;
  }
}

module.exports = MongoDBInstance;
