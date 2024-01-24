import passport from "passport";
import { usersManager } from "./DAL/daos/MongoDB/usersManager.mongo.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { hashData, compareData } from "./utils.js";
import { logger } from "./logger.js";
import UsersResponse from "./DAL/dtos/users-response.dto.js";
import config from "../src/config/config.js";

const SECRET_KEY_JWT = config.secret_jwt;

logger.info("Config de passport", config.secret_jwt);
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
        done(null, false, { message: "All fields are required" });
      }
      try {
        const user = await usersManager.findByEmail(email);
        if (!user) {
          return done(null, false, { message: "You have to sign up first" });
        }
        const isPasswordValid = await compareData(password, user.password);
        if (!isPasswordValid) {
          return done(null, false, { message: "Incorrect email or password" });
        }

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// //github
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
// // // jwt
const fromCookies = (req) => {
  return req.cookies.token;
};

// ...
passport.use(
  "jwt",
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([fromCookies]),
      secretOrKey: SECRET_KEY_JWT,
    },
    async (jwt_payload, done) => {
      try {
        return done(null, jwt_payload);
      } catch (error) {
        return done(error);
      }
    }
  )
);
// ...
passport.use(
  "current",
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([fromCookies]),
      secretOrKey: SECRET_KEY_JWT,
    },

    async (jwt_payload, done) => {
      try {
        const user = await usersManager.findByEmail(jwt_payload.mail);

        console.log(user);
        if (!user) {
          return done(null, false, { message: "Usuario no encontrado" });
        }
        const userDTO = new UsersResponse(user);
        return done(null, userDTO);
      } catch (error) {
        console.error("Error during JWT verification:", error.message);
        return done(error); // Llama a done con el error
      }
    }
  )
);

// // google

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID:
        "924625436059-qaq75i9qakbaikhrkbofknj0986ggu21.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8080/api/sessions/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        console.log(profile);

        const userDB = await usersManager.findByEmail(profile._json.email);
        console.log("el usuario del db", userDB);
        if (userDB) {
          if (userDB.isGoogle) {
            return done(null, userDB);
          } else {
            return done(null, false);
          }
        }
        const userEmail = profile.emails[0].value;
        const infoUser = {
          first_name: profile._json.given_name,
          last_name: profile._json.family_name,
          password: " ",
          email: userEmail,
          isGoogle: true,
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
