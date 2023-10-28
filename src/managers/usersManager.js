import { usersModel } from "../db/models/users.model.js";

class UsersManager1 {
  async findAll() {
    const response = await usersModel.find();
    return response;
  }
  async createOne(obj) {
    const response = await usersModel.create(obj);
    return response;
  }

  async findById(id) {
    const response = await usersModel.findById(id);
    return response;
  }

  async updateOne(id, obj) {
    const response = await usersModel.updateOne({ _id: id }, obj);
    return response;
  }

  async deleteOne(id) {
    const response = await usersModel.deleteOne({ _id: id }, obj);
    return response;
  }
}

export const usersManager1 = new UsersManager1();