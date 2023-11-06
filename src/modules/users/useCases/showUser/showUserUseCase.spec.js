const ShowUserUseCase = require("./showUserUseCase");
const InMemoryUsersRepository = require("../../repositories/in-memory/InMemoryUsersRepository");
const AppError = require("../../../../utils/errors/appError");

describe("Show user useCase", () => {
  let showUserUseCase;
  let inMemoryUsersRepository;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    showUserUseCase = new ShowUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to show a existing user", async () => {
    const user = {
      name: "Test Name",
      email: "testEmail@example.com",
      password: "testPassword",
      address: "R. Exemplo, B. Arlindo Cruz, N° 78",
      pessoal_number: "47912457801",
    };

    const createdUser = await inMemoryUsersRepository.create(user);

    const foundUser = await showUserUseCase.execute({
      id_user: createdUser.id,
    });

    expect(foundUser.name).toBe(user.name);
  });

  it("should throw an error when a invalid ID is provided", async () => {
    const invalidId = "invalid-id";

    await expect(
      showUserUseCase.execute({ id_user: invalidId })
    ).rejects.toEqual(new AppError("User not found!!", 404));
  });
});
