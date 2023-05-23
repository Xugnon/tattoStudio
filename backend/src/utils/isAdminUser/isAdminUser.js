const prisma = require("../../database/prismaClient");
const { hash } = require("bcryptjs");

// File to create a ADMIN user to manipulate certain routes
async function IsAdminUser() {
  try {
    // Make sure to insert the your's config to craate an Admin User ->
    const hashPassword = await hash("adminExample", 5);
    const user = await prisma.users.create({
      data: {
        name: "Admin User",
        email: "adminuser@example.com",
        password: hashPassword,
        address: "R. Example, B. Test, N°69",
        pessoal_number: "99999999999",
      },
    });

    const admin = await prisma.users.update({
      where: { id: user.id },
      data: { isAdmin: true },
    });

    console.log(admin);
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    await prisma.$disconnect();
  }
}
// Then run the script to create your user: 'npm run create:admin'
IsAdminUser();
