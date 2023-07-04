class DeleteServiceUseCase {
  constructor(servicesRepository) {
    this.servicesRepository = servicesRepository;
  }

  async execute({ id }) {
    await this.servicesRepository.deleteById({ id });

    return;
  }
}

module.exports = DeleteServiceUseCase;
