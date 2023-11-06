const { v4 } = require("uuid");

class InMemorySchedulesRepository {
  constructor() {
    this.schedules = [];
  }

  async create({ eventName, startTime, endTime }) {
    const newSchedule = {
      id: v4(),
      eventName,
      startTime,
      endTime,
      servicesId: null,
      userId: null,
    };

    this.schedules.push(newSchedule);

    return newSchedule;
  }

  async findById({ id_schedule }) {
    const schedule = this.schedules.find(
      (schedule) => schedule.id === id_schedule
    );

    return schedule;
  }

  async findMany() {
    const schedules = this.schedules.filter(
      (schedule) => schedule.servicesId === null && schedule.userId === null
    );

    return schedules;
  }

  async insertUserAndService({ id_schedule, id_user, id_service }) {
    const scheduleIndex = this.schedules.findIndex(
      (schedule) => schedule.id === id_schedule
    );
    if (scheduleIndex !== -1) {
      this.schedules[scheduleIndex].servicesId = id_service;
      this.schedules[scheduleIndex].userId = id_user;

      return this.schedules[scheduleIndex];
    }
  }

  async removeUserServiceFromSchedule({ id_schedule }) {
    const scheduleIndex = this.schedules.findIndex(
      (schedule) => schedule.id === id_schedule
    );
    if (scheduleIndex !== -1) {
      this.schedules[scheduleIndex].servicesId = null;
      this.schedules[scheduleIndex].userId = null;
    }
  }

  async removeUserSchedule({ id_schedule }) {
    const scheduleIndex = this.schedules.findIndex(
      (schedule) => schedule.id === id_schedule
    );
    if (scheduleIndex !== -1) {
      this.schedules[scheduleIndex].userId = null;
    }
  }

  async deleteById({ id }) {
    const scheduleIndex = this.schedules.findIndex(
      (schedule) => schedule.id === id
    );
    if (scheduleIndex !== -1) {
      this.schedules.splice(scheduleIndex, 1);
    }
  }
}

module.exports = InMemorySchedulesRepository;
