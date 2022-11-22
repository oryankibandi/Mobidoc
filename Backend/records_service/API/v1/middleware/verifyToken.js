require("dotenv").config();
const openRoutes = require("../config/openRoutes");
const JWT = require("../helpers/jwt");

const verifyToken = async (req, res, next) => {
  console.log(
    `${req.method}, ${req.url}, ${req.headers.host}, ${req.headers["user-agent"]}`
  );
  console.log();
  if (openRoutes.find((e) => e === req.url)) {
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

      jwtInstance.on("decoded", (decoded) => {
        req.user = decoded;
        return next();
      });

      jwtInstance.on("invalidToken", (error) => {
        res.status(401).json({
          status: "ERROR",
          message: error.message,
        });
      });

      jwtInstance.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
      res.status(401).json({
        status: "ERROR",
        message: error.message,
      });
    }
  }
};

module.exports = verifyToken;
