import { cartsModel } from "../db/models/carts.model.js";

class CartsManager {
  async findAll() {
    const result = await cartsModel.find();
    return result;
  }
  async findById(id) {
    const result = await cartsModel.findById(id);
    return result;
  }
  async createOne(obj) {
    const result = await cartsModel.create(obj);
    return result;
  }
  async updateOne(cid, pid) {
    const result = await cartsModel.createIndexes({ _id: id }, pid);
    return result;
  }
  async deteleAll() {
    const result = await cartsModel.deleteMany({});
    return result;
  }
}

export const cartsManager = new CartsManager();
