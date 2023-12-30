import { ticketModel } from "../../daos/db/models/ticket.model.js";

class TicketManager {
  async findById(id) {
    const response = await ticketModel.findById(id);
    return response;
  }

  async findByEmail(email) {
    const response = await ticketModel.findOne({ email });
    return response;
  }

  async createOne(obj) {
    const response = await ticketModel.create(obj);
    return response;
  }
}

export const Ticket = new TicketManager();
