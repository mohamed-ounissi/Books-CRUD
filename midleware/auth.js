const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports.loggedMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    const response = await User.findOne({ _id: userId });

    if (response) {
      req.auth = {
        userId: userId,
        role: response.role,
      };
      next();
    } else {
      res.status(401).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};

module.exports.isAdmin = (req, res, next) => {
  try {
    if (req.auth.role === "admin") {
      next();
    } else {
      res.status(403).json({ error: "No access to this route" });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
