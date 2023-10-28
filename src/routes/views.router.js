import { Router } from "express";
import { manager } from "../ProductsManager.js";
import { usersManager1 } from "../managers/usersManager.js";
const router = Router();

//ruta handlebars
router.get("/", async (req, res) => {
  try {
    const products = await manager.getProducts({});
    res.render("home", { response: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    res.render("realTimeProducts");
  } catch (error) {
    throw new Error(error.message);
  }
});
router.get("/homeuser/:idUser", async (req, res) => {
  const { idUser } = req.params;
  const user = await usersManager1.findById(idUser);
  const { first_name, last_name } = user;
  res.render("homeuser", { first_name, last_name });
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});

router.get("/chat/:idUser", async (req, res) => {
  const { idUser } = req.params;
  try {
    const user = await usersManager1.findById(idUser);
    const { first_name, last_name } = user;
    res.render("chat", { first_name, last_name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//
export default router;
