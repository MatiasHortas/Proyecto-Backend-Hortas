import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  isSingle: {
    type: Boolean,
    default: false,
  },
  isGithub: {
    type: Boolean,
    default: false,
  },
  isGoogle: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["ADMIN", "USER", "PREMIUM"],
    default: "USER",
  },
  cart: {
    type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "carts" }],
  },
});

export const usersModel = mongoose.model("Users", usersSchema);
