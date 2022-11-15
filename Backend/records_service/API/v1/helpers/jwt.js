require("dotenv").config();
const Events = require("node:events");
const jwt = require("jsonwebtoken");

class JWT extends Events {
  constructor() {
    super();
  }

  generateAccessToken(payload, duration = "6h") {
    try {
      const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: duration,
      });

      this.emit("accessTokenGenerated");

      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  generateRefreshToken(payload, duration = "6d") {
    try {
      const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: duration,
      });

      this.emit("refreshTokenGenerated");

      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  generateRecordAccessToken(payload, duration = "7d") {
    try {
      const token = jwt.sign(payload, process.env.RECORD_ACCESS_SECRET, {
        expiresIn: duration,
      });

      this.emit("recordTokenGenerated");

      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  verify(token, secret) {
    try {
      const decoded = jwt.verify(token, secret);
      this.emit("decoded", decoded);
      return decoded;
    } catch (error) {
      this.emit("invalidToken", error);
    }
  }
}

module.exports = JWT;
