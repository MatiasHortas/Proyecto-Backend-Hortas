import { Router } from "express";
import { transporter } from "../nodemailers.js";

const router = Router();

router.get("/", async (req, res) => {
  const mailOptions = {
    from: "MatiCoder",
    to: "matihortassn1per@gmail.com",
    subject: "Registro Exitoso",
    text: "Bievenido, Te Registraste Correctamente.",
  };
  await transporter.sendMail(mailOptions);
  res.send("email enviado");
});

export default router;
