const AuthenticateUserUseCase = require("./authenticateUserUseCase");
const InMemoryUsersRepository = require("../../repositories/in-memory/InMemoryUsersRepository");
const AppError = require("../../../../utils/errors/appError");

describe("Authenticate user useCase", () => {
  let authenticateUserUseCase;
  let inMemoryUsersRepository;

  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository
    );

    const user = {
      name: "Test Name",
      email: "testEmail@example.com",
      password: "testPassword",
      address: "R. Exemplo, B. Arlindo Cruz, N° 78",
      pessoal_number: "47912457801",
    };

    await inMemoryUsersRepository.create(user);
  });

  it("should be able to authenticate a user and return a token", async () => {
    const credentials = {
      email: "testEmail@example.com",
      password: "testPassword",
    };

    const token = await authenticateUserUseCase.execute(credentials);

    expect(token).toBeTruthy();
  });

  it("should throw an error when email is not found", async () => {
    const credentials = {
      email: "falseEmail@example.com", //fake email
      password: "testPassword",
    };

    await expect(authenticateUserUseCase.execute(credentials)).rejects.toEqual(
      new AppError("Email or Password invalid!!", 401)
    );
  });

  it("should throw an error when password is invalid", async () => {
    const credentials = {
      email: "testEmail@example.com",
      password: "falsePassword", //fake password
    };

    await expect(authenticateUserUseCase.execute(credentials)).rejects.toEqual(
      new AppError("Email or Password invalid!!", 401)
    );
  });
});
