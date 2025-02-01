import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  return jwt.sign({userId},process.env.ACCESS_TOKEN_SECRET,{expiresIn: '15d'});
}

export default generateToken;