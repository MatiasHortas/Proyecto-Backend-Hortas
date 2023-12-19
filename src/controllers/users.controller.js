import {
  findAll,
  findById,
  createOne,
  deleteOneUser,
  updateUser,
} from "../services/user.service.js";

import { jwtValidation } from "../middlewares/jwt.middeware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import passport from "passport";

export const findAllUsers = async (req, res) => {
  try {
    const users = await findAll();
    res.status(200).json({ message: "Users", users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findUserByID = async (req, res) => {
  passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const { idUser } = req.params;
      if (req.user.role === "ADMIN") {
        return res.status(403).json({ message: "Not Authorized" });
      }
      try {
        const users = await findById(idUser);
        res.status(200).json({ message: "Users", users });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
};

export const createUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  try {
    const createdUser = await createOne(req.body);
    res.redirect(`/api/views/chat/${createdUser._id}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { idUsers } = req.params;
  try {
    await deleteOneUser(idUsers);
    res.status(200).json({ message: "Usuario deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOneUser = async (req, res) => {
  const { idUser } = req.params;
  try {
    const userUpdated = await updateUser(idUser, req.body);
    res.status(200).json({ message: "User updated", userUpdated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
