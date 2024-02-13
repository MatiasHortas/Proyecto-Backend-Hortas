import { productsManager } from "../src/DAL/daos/MongoDB/productsManager.mongo.js";
import { expect } from "chai";
import "../src/DAL/daos/db/configDB.js";
import mongoose from "mongoose";

describe("Find all products", function () {
  it("should return an array", async function () {
    const limit = 2;
    const response = await productsManager.findAll({ limit });
    expect(response.results).to.be.an("array");
  });
});

describe("Create one product", function () {
  after(async function () {
    await mongoose.connection.collections.products.deleteMany({
      testFlag: true,
    });
  });
  const productMock1 = {
    name: "Mouse",
    description: "Red Dragon",
    price: "2500",
    stock: "30",
    code: "45asdfsmouse",
    category: "Tecnologia",
    testFlag: true,
  };
  const productMock2 = {
    description: "Camera",
    price: "2500",
    stock: "20",
    code: "20",
    category: "Tecnologia",
    testFlag: false,
  };
  it("Products created", async function () {
    const response = await productsManager.createOne(productMock1);
    expect(response).to.have.property("testFlag");
  });
});

describe("Delete one product", function () {
  it("Product deleted", async function () {
    const productMock1 = {
      name: "Mouse 2",
      description: "Red Dragon",
      price: "2500",
      stock: "30",
      code: "42323235asdfsmouse",
      category: "Tecnologia",
      testFlag: true,
    };
    try {
      const response = await productsManager.createOne(productMock1);
      const productsDeleted = await productsManager.deleteOne(response._id);
      expect(productsDeleted).to.exist;
    } catch (error) {
      console.log("Error", error);
    }
  });
});
