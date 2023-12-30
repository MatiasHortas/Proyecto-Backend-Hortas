import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },

  dateOfPurchase: {
    type: Date,
    default: Date.now,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  purchaserName: {
    type: String,
  },
});

export const ticketModel = mongoose.model("ticket", ticketSchema);
