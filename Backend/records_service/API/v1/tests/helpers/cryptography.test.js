const Crypto = require("../../helpers/cryptography");

let cryptoInstance;
describe("Crypto class", () => {
  beforeEach(() => {
    cryptoInstance = new Crypto();
  });

  it("generateUUID() returns a string", () => {
    expect(typeof cryptoInstance.generateUUID()).toBe("string");
  });

  it("generateUUID() returns a unique value", () => {
    const uid_1 = cryptoInstance.generateUUID();
    const uid_2 = cryptoInstance.generateUUID();
    expect(uid_1).not.toEqual(uid_2);
  });

  it("hash throw an error when no value is passed", () => {
    expect(() => cryptoInstance.hash()).toThrow("Text to hash not provided");
  });

  it("hash() returns a string", () => {
    expect(typeof cryptoInstance.hash("jjjjnnksnajkj")).toBe("string");
  });

  it("hash length is 1024", () => {
    let hash = cryptoInstance.hash("jjjjnnksnajkj");

    expect(hash.length).toBe(1024);
  });
});
