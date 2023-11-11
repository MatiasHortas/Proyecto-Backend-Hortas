import { Router } from "express";
import { usersManager } from "../managers/usersManager.js";

const router = Router();

router.post("/signup", async (req, res) => {
  const { first_name, last_name, email, password, age } = req.body;
  if (!first_name || !last_name || !email || !password || !age) {
    return res.status(400).json({ message: "Faltan datos de ingresar" });
  }
  try {
    const createdUser = await usersManager.createOne(req.body);
    res.status(200).json({ message: "Usuario Creado", user: createdUser });
  } catch (error) {
    res.status(500).json({ error });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Faltan datos de ingresar" });
  }
  try {
    const user = await usersManager.findByEmail(email);
    if (!user) {
      return res.redirect("/api/views/signup");
    }
    const isPasswordValid = password === user.password;
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password no es valido" });
    }
    const sessionInfo =
      email === "adminCoder@coder.com" && password === "adminCod3r123"
        ? { first_name: user.first_name, email, isAdmin: true }
        : { first_name: user.first_name, email, isAdmin: false };
    req.session.user = sessionInfo;
    res.redirect("/api/views/profile");
  } catch (error) {
    res.status(500).json({
      mensaje: "error en el servidor",
      error: error.message,
      stack: error.stack,
    });
  }
});

router.get("/signout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/api/views/login");
  });
});
export default router;
