class DeleteScheduleUseCase {
  constructor(schedulesRepository) {
    this.schedulesRepository = schedulesRepository;
  }
  async execute({ id }) {
    await this.schedulesRepository.deleteById({ id });

    return;
  }
}

module.exports = DeleteScheduleUseCase;
