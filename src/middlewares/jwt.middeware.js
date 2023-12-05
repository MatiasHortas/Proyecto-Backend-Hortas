import jwt from "jsonwebtoken";

const SECRET_KEY_JWT = "secretJWT";

export const jwtValidation = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    const token = authHeader.split(" ")[1];
    console.log("authHeader", authHeader);
    const userToken = jwt.verify(token, SECRET_KEY_JWT);
    req.user = userToken;
    next();
    console.log(userToken);
  } catch (error) {
    res.json({ error: error.message });
  }
};
