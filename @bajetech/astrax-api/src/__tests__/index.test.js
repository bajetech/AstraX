import AstraXAPI from "../index";

describe("freighter API", () => {
  it("has keys", () => {
    expect(typeof AstraXAPI.isConnected).toBe("function");
    expect(typeof AstraXAPI.getPublicKey).toBe("function");
    expect(typeof AstraXAPI.signTransaction).toBe("function");
  });
});
