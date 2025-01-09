const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    console.log("req authorization headers", req.headers.authorization); // Bearer asdasd.12321e.asdasf
    const token = req.headers.authorization.split(" ")[1];
    console.log("token", token);
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("verifiedToken", verifiedToken);
    req.body.userId = verifiedToken.userId;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized" });
  }
};

module.exports = auth;
