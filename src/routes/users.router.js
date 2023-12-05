import { Router } from "express";
import { usersManager } from "../managers/usersManager.js";
import { jwtValidation } from "../middlewares/jwt.middeware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import passport from "passport";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await usersManager.findAll();
    res.status(200).json({ message: "Users", users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get(
  "/idUser",
  passport.authenticate("jwt", { session: false }),

  async (req, res) => {
    const { idUser } = req.params;
    console.log("user", req.user);
    if (req.user.role === "ADMIN") {
      return res.status(403).json({ message: "Not Authorized" });
    }
    try {
      const users = await usersManager.findById(idUser);
      res.status(200).json({ message: "Users", users });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);
router.post("/", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  try {
    const createdUser = await usersManager.createOne(req.body);
    res.redirect(`/api/views/chat/${createdUser._id}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/idUser", async (req, res) => {
  const { idUsers } = req.params;
  try {
    await usersManager.deleteOne(idUsers);
    res.status(200).json({ message: "Usuario deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
