const Router = require("express");
const CreateServiceController = require("../../../../modules/services/useCases/createService/createServiceController");
const GetAvailableServicesController = require("../../../../modules/services/useCases/getAvailableServices/getAvailableServicesController");

const ensureAdminUser = require("../middlewares/ensureAdminUser");
const ensureAuthUser = require("../middlewares/ensureAuthUser");

const servicesRoutes = Router();

const createServiceController = new CreateServiceController();
const getAvailableServicesController = new GetAvailableServicesController();

servicesRoutes.post(
  "/",
  ensureAuthUser,
  ensureAdminUser,
  createServiceController.handle
);

servicesRoutes.get("/", ensureAuthUser, getAvailableServicesController.handle);

module.exports = servicesRoutes;
