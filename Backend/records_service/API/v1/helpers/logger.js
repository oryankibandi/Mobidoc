const Events = require("node:events");

class Logger extends Events {
  constructor(req) {
    super();
    this.req = req;
    this.now = new Date(Date.now()).toLocaleString("en-US", {
      timeZone: "Africa/Nairobi",
    });
  }

  log() {
    this.now = this.now.split(",").join("").split(" ").join("_");
    const log = `${this.now}, ${this.req.headers["X-Real-IP"]}, ${this.req.method}, ${this.req.url}, ${this.req.headers.host}, ${this.req.headers["user-agent"]}, ${this.req.headers["X-Forwarded-For"]}`;

    this.emit("log", log);
    return log;
  }
}

module.exports = Logger;
