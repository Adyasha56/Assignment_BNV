import BlacklistedToken from "../models/token.model.js";

// USER LOGOUT
export const logoutAdmin = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  await BlacklistedToken.create({ token });

  res.json({ message: "Logged out successfully" });
};