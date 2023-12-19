import { messagesModel } from "../../db/models/messages.model.js";

class MessagesManager {
  async createOne(obj) {
    console.log("objeto creado", obj);
    const response = await messagesModel.create(obj);
    return response;
  }
  async findAll() {
    const response = await messagesModel.find();
    return response;
  }

  async deleteAll() {
    const response = await messagesModel.deleteMany({});
    return response;
  }
}

export const messagesManager = new MessagesManager();
