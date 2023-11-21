import { Router } from "express";
import { usersManager } from "../managers/usersManager.js";
import { hashData, compareData } from "../utils.js";
import passport from "passport";
import { compare } from "bcrypt";
const router = Router();

// router.post("/signup", async (req, res) => {
//   const { first_name, last_name, email, password, age } = req.body;
//   if (!first_name || !last_name || !email || !password || !age) {
//     return res.status(400).json({ message: "Faltan datos de ingresar" });
//   }
//   try {
//     const hashedPassword = await hashData(password);
//     const createdUser = await usersManager.createOne({
//       ...req.body,
//       password: hashedPassword,
//     });
//     res.status(200).json({ message: "Usuario Creado", user: createdUser });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({ message: "Faltan datos de ingresar" });
//   }
//   try {
//     const user = await usersManager.findByEmail(email);
//     if (!user) {
//       return res.redirect("/api/views/signup");
//     }
//     // const isPasswordValid = password === user.password;
//     const isPasswordValid = await compareData(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Password no es valido" });
//     }
//     const sessionInfo =
//       email === "adminCoder@coder.com" && password === "adminCod3r123"
//         ? { first_name: user.first_name, email, isAdmin: true }
//         : { first_name: user.first_name, email, isAdmin: false };
//     req.session.user = sessionInfo;
//     res.redirect("/api/views/profile");
//   } catch (error) {
//     res.status(500).json({
//       mensaje: "error en el servidor",
//       error: error.message,
//       stack: error.stack,
//     });
//   }
// });

// SIGNUP LOGIN PASSPOORT local

router.post(
  "/signup",
  passport.authenticate("signup", {
    successRedirect: "/api/views/login",
    failureRedirect: "/api/views/error",
  })
);
router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/api/views/profile",
    failureRedirect: "/api/views/error",
  })
);
// SIGNUP LOGIN PASSPOORT GITHUB

router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get("/callback", passport.authenticate("github"), (req, res) => {
  res.redirect("/api/views/profile");
});
router.get("/signout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/api/views/login");
  });
});
router.post("/restaurar", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await usersManager.findByEmail(email);
    if (!user) {
      return res.redirect("/api/views/login");
    }
    const hashedPassword = await hashData(password);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password Actualizado" });
  } catch (error) {
    res.status(500).json({ error });
  }
});
export default router;
