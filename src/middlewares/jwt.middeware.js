import jwt from "jsonwebtoken";
import config from "../config/config.js";

const SECRET_KEY_JWT = config.secret_jwt;

console.log("Config de middleware", config.secret_jwt);
export const jwtValidation = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    console.log("Authorization Header:", authHeader);

    const token = authHeader.split(" ")[1];
    console.log("Token:", token);
    const userToken = jwt.verify(token, SECRET_KEY_JWT);
    req.user = userToken;
    next();
    console.log(userToken);
  } catch (error) {
    res.json({ error: error.message });
  }
};
