require("dotenv").config();
const JWT = require("../helpers/jwt");

const verifyToken = async (req, res, next) => {
  if (req.url.includes("patient") || req.url.includes("doctor")) {
    return next();
  }

  const auth_header = req.headers.authorization || req.headers.Authorization;

  if (!auth_header) {
    res.status(401).json({
      status: "ERROR",
      message: "unauthorized",
    });
  } else {
    try {
      const token = auth_header.split(" ")[1];
      const jwtInstance = new JWT();

      jwtInstance.verify(token, process.env.ACCESS_TOKEN_SECRET);
      jwtInstance.on("decoded", (decoded) => {
        req.user = decoded;
        return next();
      });
    } catch (error) {
      res.status(401).json({
        status: "ERROR",
        message: error.message,
      });
    }
  }
};

module.exports = verifyToken;
