const prisma = require("../../../database/prismaClient");
const { hash } = require("bcryptjs");

class PrismaUsersRepository {
  async create({ name, email, password, address, pessoal_number }) {
    const hashPassword = await hash(password, 5);

    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashPassword,
        address,
        pessoal_number,
      },
    });

    return user;
  }

  async findByEmailOrNumber({ email, pessoal_number }) {
    const user = await prisma.users.findFirst({
      where: {
        OR: [{ email }, { pessoal_number }],
      },
    });

    return user;
  }

  async findById({ id_user }) {
    const user = await prisma.users.findUnique({
      where: {
        id: id_user,
      },
      include: {
        Services: true,
        Schedules: true,
      },
    });

    return user;
  }

  async findByEmail({ email }) {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}

module.exports = PrismaUsersRepository;
