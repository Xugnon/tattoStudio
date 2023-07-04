const CreateServiceUseCase = require("./createServiceUseCase");
const InMemoryUsersRepository = require("../../repositories/in-memory/InMemoryServicesRepository");

describe("Create service useCase", () => {
  let createServiceUseCase;
  let inMemoryServicesRepository;

  beforeEach(() => {
    inMemoryServicesRepository = new InMemoryUsersRepository();
    createServiceUseCase = new CreateServiceUseCase(inMemoryServicesRepository);
  });

  it("should be able to create a new service", async () => {
    const service = {
      title: "Tattoo Teste",
      description: "Tattoo Teste perna esquerda",
    };

    const createdService = await createServiceUseCase.execute(service);

    expect(createdService).toHaveProperty("id");
  });
});
