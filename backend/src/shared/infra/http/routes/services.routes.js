const Router = require("express");
const CreateServiceController = require("../../../../modules/services/useCases/createService/createServiceController");

const servicesRoutes = Router();

const createServiceController = new CreateServiceController();

servicesRoutes.post("/", createServiceController.handle);

module.exports = servicesRoutes;
