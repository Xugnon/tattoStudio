class CreateServiceUseCase {
  constructor(servicesRepository) {
    this.servicesRepository = servicesRepository;
  }

  async execute({ title, description }) {
    const service = await this.servicesRepository.create({
      title,
      description,
    });

    return service;
  }
}

module.exports = CreateServiceUseCase;
