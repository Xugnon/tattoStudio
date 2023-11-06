const GetAvailableServicesUseCase = require("./getAvailableServicesUseCase");
const InMemoryServicesRepository = require("../../repositories/in-memory/InMemoryServicesRepository");

describe("Get available services useCase", () => {
  let getAvailableServicesUseCase;
  let inMemoryServicesRepository;

  beforeEach(() => {
    inMemoryServicesRepository = new InMemoryServicesRepository();
    getAvailableServicesUseCase = new GetAvailableServicesUseCase(
      inMemoryServicesRepository
    );
  });

  it("should be able to get available's services", async () => {
    await inMemoryServicesRepository.create({
      tile: "test",
      description: "test",
    });

    const services = await getAvailableServicesUseCase.execute();

    expect(services).toBeTruthy();
  });
});
