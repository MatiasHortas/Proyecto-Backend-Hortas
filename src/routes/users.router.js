import { Router } from "express";
import { usersManager1 } from "../managers/usersManager.js";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await usersManager1.findAll();
    res.status(200).json({ message: "Users", users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/idUser", async (req, res) => {
  const { idUser } = req.params;
  try {
    const users = await usersManager1.findById(idUser);
    res.status(200).json({ message: "Users", users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  try {
    const createdUser = await usersManager1.createOne(req.body);
    // res.status(200).json({ message: "User Created", user: createdUser });
    res.redirect(`/api/views/chat/${createdUser._id}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/idUser", async (req, res) => {
  const { idUsers } = req.params;
  try {
    await usersManager1.deleteOne(idUsers);
    res.status(200).json({ message: "Usuario deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
