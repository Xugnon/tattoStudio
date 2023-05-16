const prisma = require("../../../../database/prismaClient");

class CreateUserUseCase {
  async execute({ name, email, address, pessoal_number }) {
    const user = await prisma.users
      .create({
        data: {
          name,
          email,
          address,
          pessoal_number,
        },
      })
      .catch((error) => {
        console.log(error);
      });

    return user;
  }
}

module.exports = CreateUserUseCase;
