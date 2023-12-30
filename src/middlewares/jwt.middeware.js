import jwt from "jsonwebtoken";
import config from "../config/config.js";

const SECRET_KEY_JWT = config.secret_jwt;

export const jwtValidation = (req, res, next) => {
  try {
    console.log(req);
    const token = req.cookies.token;
    const userToken = jwt.verify(token, SECRET_KEY_JWT);
    req.user = userToken;
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};
