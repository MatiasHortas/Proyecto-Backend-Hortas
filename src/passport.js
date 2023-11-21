import passport from "passport";
import { usersManager } from "./managers/usersManager.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { hashData, compareData } from "./utils.js";

// // local
passport.use(
  "signup",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      const { first_name, last_name, age } = req.body;
      if (!first_name || !last_name || !email || !password || !age) {
        return done(null, false);
      }
      try {
        const hashedPassword = await hashData(password);
        const createdUser = await usersManager.createOne({
          ...req.body,
          password: hashedPassword,
        });
        done(null, createdUser);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      if (!email || !password) {
        done(null, false);
      }
      try {
        const user = await usersManager.findByEmail(email);
        if (!user) {
          done(null, false);
        }
        const isPasswordValid = await compareData(password, user.password);
        if (!isPasswordValid) {
          done(null, false);
        }
        // const sessionInfo =
        //   email === "adminCoder@coder.com" && password === "adminCod3r123"
        //     ? { first_name: user.first_name, email, isAdmin: true }
        //     : { first_name: user.first_name, email, isAdmin: false };
        // req.session.user = sessionInfo;
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

//github
passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: "Iv1.b421c84f0f80f1da",
      clientSecret: "e4f515802594436ad555305ab52e55655393bc95",
      callbackURL: "http://localhost:8080/api/sessions/callback",
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      // done(null, false);

      try {
        console.log(profile);

        const userDB = await usersManager.findByEmail(profile.emails[0].value);
        console.log("el usuario del db", userDB);
        if (userDB) {
          if (userDB.isGithub) {
            return done(null, userDB);
          } else {
            return done(null, false);
          }
        }
        const infoUser = {
          first_name: profile._json.name.split(" ")[0],
          last_name: profile._json.name.split(" ")[1],
          password: " ",
          email: profile.emails[0].value,
          isGithub: true,
        };
        console.log(profile);

        const createUser = await usersManager.createOne(infoUser);
        done(null, createUser);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await usersManager.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
