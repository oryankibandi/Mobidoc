const Logger = require("../helpers/logger");

const logRequests = async (req, res, next) => {
  const logger = new Logger(req);

  logger.on("log", (log) => {
    console.log(log);
    return next();
  });

  logger.log();
};

module.exports = logRequests;
