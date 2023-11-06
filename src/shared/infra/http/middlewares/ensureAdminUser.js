const prisma = require("../../../../database/prismaClient");

async function ensureAdminUser(req, res, next) {
  const id = req.id_user;

  const user = await prisma.users.findFirst({
    where: {
      id: id,
    },
  });

  if (!user.isAdmin) {
    return res.status(401).json({
      message: "Not an admin user",
    });
  } else {
    return next();
  }
}

module.exports = ensureAdminUser;
