class GetAvailableSchedulesUseCase {
  constructor(schedulesRepository) {
    this.schedulesRepository = schedulesRepository;
  }
  async execute() {
    const schedules = await this.schedulesRepository.findMany();

    return schedules;
  }
}

module.exports = GetAvailableSchedulesUseCase;
