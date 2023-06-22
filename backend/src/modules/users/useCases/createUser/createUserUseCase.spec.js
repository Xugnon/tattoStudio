const CreateUserUseCase = require("./createUserUseCase");
const InMemoryUsersRepository = require("../../repositories/in-memory/InMemoryUsersRepository");
const AppError = require("../../../../utils/errors/appError");

describe("Create user useCase", () => {
  let createUserUseCase;
  let inMemoryUsersRepository;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to create a new user", async () => {
    const user = {
      name: "Test Name",
      email: "testEmail@example.com",
      password: "testPassword",
      address: "R. Exemplo, B. Arlindo Cruz, N° 78",
      pessoal_number: "47912457801",
    };

    const createdUser = await createUserUseCase.execute(user);

    expect(createdUser).toHaveProperty("id");
    expect(createdUser.password).not.toBe(user.password); // Senha deve estar criptografada
  });

  it("should throw an error when email already exists", async () => {
    const existingUser = {
      name: "Existing User",
      email: "testEmail@example.com",
      password: "testPassword",
      address: "R. Exemplo, B. Arlindo Cruz, N° 78",
      pessoal_number: "67987654321",
    };
    await inMemoryUsersRepository.create(existingUser);

    const user = {
      name: "Test Name",
      email: "testEmail@example.com", //Mesmo email que o existingUser
      password: "testPassword",
      address: "R. Exemplo, B. Arlindo Cruz, N° 78",
      pessoal_number: "47912457801",
    };

    await expect(createUserUseCase.execute(user)).rejects.toEqual(
      new AppError("Email or Number already in use!!", 409)
    );
  });

  it("should throw an error when email or number already exists", async () => {
    const existingUser = {
      name: "Existing User",
      email: "testEmail@example.com",
      password: "testPassword",
      address: "R. Exemplo, B. Arlindo Cruz, N° 78",
      pessoal_number: "67987654321",
    };
    await inMemoryUsersRepository.create(existingUser);

    const user = {
      name: "Test Name",
      email: "newTestEmail@example.com",
      password: "testPassword",
      address: "R. Exemplo, B. Arlindo Cruz, N° 78",
      pessoal_number: "67987654321", //Mesmo numero que o existingUser
    };

    await expect(createUserUseCase.execute(user)).rejects.toEqual(
      new AppError("Email or Number already in use!!", 409)
    );
  });
});
