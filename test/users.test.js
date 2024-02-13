import { usersManager } from "../src/DAL/daos/MongoDB/usersManager.mongo.js";
import { expect } from "chai";

describe("Get users", function () {
  it("should return an array", async function () {
    const usersDao = new usersManager();
    const result = await usersDao.get();
    expect(result).to.be.an("array");
  });
  it("should have length of 0 if not users found", async function () {});
});
