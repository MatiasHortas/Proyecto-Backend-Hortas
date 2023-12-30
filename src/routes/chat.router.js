import { Router } from "express";
import { messagesManager } from "../DAL/daos/MongoDB/messagesManager.mongo.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = Router();

//ruta handlebars

router.get("/", authMiddleware(["USER"]), async (req, res) => {
  try {
    const message = await messagesManager.findAll();
    res.status(200).json({ message: "Mensaje", message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const createdMessage = await messagesManager.createOne(req.body);
    // res.status(200).json({ message: "Message created", createdMessage });
    console.log("mensaje creado", createdMessage);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    console.log("mensaje", error);
  }
});

router.delete("/", async (req, res) => {
  try {
    await messagesManager.deleteAll();
    res.status(200).json({ message: "Mensajes borrados" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
