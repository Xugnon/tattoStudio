const DeleteServiceUseCase = require("./deleteServiceUseCase");
const InMemoryServicesRepository = require("../../repositories/in-memory/InMemoryServicesRepository");

describe("Delete service useCase", () => {
  let deleteServiceUseCase;
  let inMemoryServicesRepository;

  beforeEach(() => {
    inMemoryServicesRepository = new InMemoryServicesRepository();
    deleteServiceUseCase = new DeleteServiceUseCase(inMemoryServicesRepository);
  });

  it("should be to delete a service", async () => {
    const service = await inMemoryServicesRepository.create({
      title: "test",
      description: "test",
    });

    await deleteServiceUseCase.execute({ id: service.id });

    const deletedService = await inMemoryServicesRepository.findById(
      service.id
    );

    expect(deletedService).not.toBeTruthy();
  });
});
