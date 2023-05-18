const { verify } = require("jsonwebtoken");

async function ensureAuthUser(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token missing!!",
    });
  } else {
    const [, token] = authHeader.split(" ");

    try {
      const { sub } = verify(token, process.env.SECRET_USER);
      req.id_user = sub;

      return next();
    } catch (error) {
      return res.status(401).json({
        message: "Invalid token!!",
      });
    }
  }
}

module.exports = ensureAuthUser;
