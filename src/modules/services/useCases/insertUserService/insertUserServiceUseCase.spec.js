const InsertUserServiceUseCase = require("./insertUserServiceUseCase");
const InMemoryUsersRepository = require("../../../users/repositories/in-memory/InMemoryUsersRepository");
const InMemoryServicesRepository = require("../../repositories/in-memory/InMemoryServicesRepository");
const AppError = require("../../../../utils/errors/appError");

describe("Insert user service useCase", () => {
  let insertUserServiceUseCase;
  let inMemoryUsersRepository;
  let inMemoryServicesRepository;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryServicesRepository = new InMemoryServicesRepository();
    insertUserServiceUseCase = new InsertUserServiceUseCase(
      inMemoryUsersRepository,
      inMemoryServicesRepository
    );
  });

  it("should be able to insert a user service", async () => {
    const user = {
      name: "Existing User",
      email: "testEmail@example.com",
      password: "testPassword",
      address: "R. Exemplo, B. Arlindo Cruz, N° 78",
      pessoal_number: "67987654321",
    };

    const { id: id_user } = await inMemoryUsersRepository.create(user);

    const { id: id_service } = await inMemoryServicesRepository.create({
      title: "test",
      description: "test",
    });

    const service = await insertUserServiceUseCase.execute({
      id_user,
      id_service,
    });

    expect(service.userId).toBeTruthy();
  });

  it("should throw an error if user is not found", async () => {
    const { id: id_service } = await inMemoryServicesRepository.create({
      title: "test",
      description: "test",
    });

    const service = {
      id_user: "invalid_id_user",
      id_service,
    };

    await expect(insertUserServiceUseCase.execute(service)).rejects.toEqual(
      new AppError("User not found!!", 404)
    );
  });

  it("should throw an error if service is not found", async () => {
    const user = {
      name: "Existing User",
      email: "testEmail@example.com",
      password: "testPassword",
      address: "R. Exemplo, B. Arlindo Cruz, N° 78",
      pessoal_number: "67987654321",
    };

    const { id: id_user } = await inMemoryUsersRepository.create(user);

    const service = {
      id_user,
      id_service: "invalid_id_service",
    };

    await expect(insertUserServiceUseCase.execute(service)).rejects.toEqual(
      new AppError("Service not found!!", 404)
    );
  });
});
