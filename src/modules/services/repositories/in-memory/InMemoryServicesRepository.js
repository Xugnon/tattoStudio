const { v4 } = require("uuid");

class InMemoryServicesRepository {
  constructor() {
    this.services = [];
  }

  async create({ title, description }) {
    const newService = {
      id: v4(),
      title,
      description,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      userId: null,
      Schedules: [],
    };

    this.services.push(newService);

    return newService;
  }

  async findMany() {
    const service = this.services.filter((service) => service.userId === null);

    return service;
  }

  async findById({ id_service }) {
    const service = this.services.find((service) => service.id === id_service);

    return service;
  }

  async findByUserId({ id_user }) {
    const service = this.services.find((service) => service.userId === id_user);

    return service;
  }

  async insertUser({ id_service, id_user }) {
    const serviceIndex = this.services.findIndex(
      (service) => service.id === id_service
    );
    if (serviceIndex !== -1) {
      this.services[serviceIndex].userId = id_user;

      return this.services[serviceIndex];
    }
  }

  async removeUserFromService({ id_service }) {
    const serviceIndex = this.services.findIndex(
      (service) => service.id === id_service
    );
    if (serviceIndex !== -1) {
      this.services[serviceIndex].userId = null;
    }
  }

  async deleteById({ id }) {
    const serviceIndex = this.services.findIndex(
      (service) => service.id === id
    );
    if (serviceIndex !== -1) {
      this.services.splice(serviceIndex, 1);
    }
  }
}

module.exports = InMemoryServicesRepository;
