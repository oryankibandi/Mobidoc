const Events = require("node:events");
const { randomUUID, createHmac, createHash } = require("node:crypto");

class Cryptography extends Events {
  constructor() {
    super();
  }

  generateUUID() {
    let randUid = randomUUID();
    randUid = randUid.split("-").join("");
    const d = new Date(Date.now());

    const final_uid = randUid.concat(
      "",
      d.getMinutes().toString(),
      d.getSeconds().toString(),
      d.getMilliseconds().toString()
    );

    this.emit("uidGenerated", final_uid);

    return final_uid;
  }

  hash(text) {
    if (!text) throw new Error("Text to hash not provided");

    let hash = createHash("shake256", { outputLength: 512 });
    hash.update(text);

    const final_hash = hash.digest("hex");

    this.emit("hashGenerated", final_hash);
    return final_hash;
  }
}

module.exports = Cryptography;
