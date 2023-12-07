import { Router } from "express";
import { usersManager } from "../managers/usersManager.js";
import { hashData, compareData, generateToken } from "../utils.js";
import passport from "passport";
import { compare } from "bcrypt";
const router = Router();

// SIGNUP LOGIN PASSPOORT local

// router.post(
//   "/login",
//   passport.authenticate("login", {
//     failureRedirect: "/api/views/signup",
//   }),
//   (req, res) => {
//     const payload = {
//       sub: req.user._id,
//       name: req.user.name,
//       mail: req.user.email,
//       role: req.user.role,
//     };
//     const token = generateToken(payload);

//     res.cookie("token", token, { maxAge: 30000, httpOnly: true });
//     return res.redirect("/api/views/profile");
//   }
// );
router.post("/login", (req, res, next) => {
  passport.authenticate("login", (err, user) => {
    console.log("Passport JWT Middleware");
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/api/views/signup");
    }
    const payload = {
      sub: user._id,
      name: user.name,
      mail: user.email,
      role: user.role,
    };
    const token = generateToken(payload);

    res.cookie("token", token, { maxAge: 30000, httpOnly: true });

    return res.redirect("/api/sessions/current");
  })(req, res, next);
});

router.post(
  "/signup",
  passport.authenticate("signup", {
    successRedirect: "/api/views/login",
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

// SIGNUP LOGIN PASSPOORT GOOGLE
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect("/api/views/profile");
  }
);
// // // // // // .
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

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("hola", req.user);
    return res.json({ message: "User information", user: req.user });
  }
);
export default router;
