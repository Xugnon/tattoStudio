class GetAvailableServicesUseCase {
  constructor(servicesRepository) {
    this.servicesRepository = servicesRepository;
  }

  async execute() {
    const services = await this.servicesRepository.findMany();

    return services;
  }
}

module.exports = GetAvailableServicesUseCase;
