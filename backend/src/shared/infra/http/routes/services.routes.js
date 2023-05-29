const Router = require("express");

const ensureAdminUser = require("../middlewares/ensureAdminUser");
const ensureAuthUser = require("../middlewares/ensureAuthUser");
const CreateServiceController = require("../../../../modules/services/useCases/createService/createServiceController");
const GetAvailableServicesController = require("../../../../modules/services/useCases/getAvailableServices/getAvailableServicesController");
const InsertUserServiceController = require("../../../../modules/services/useCases/insertUserService/insertUserServiceController");

const servicesRoutes = Router();

const createServiceController = new CreateServiceController();
const getAvailableServicesController = new GetAvailableServicesController();
const insertUserServiceController = new InsertUserServiceController();

servicesRoutes.post(
  "/",
  ensureAuthUser,
  ensureAdminUser,
  createServiceController.handle
);

servicesRoutes.get("/", ensureAuthUser, getAvailableServicesController.handle);

servicesRoutes.put("/:id", ensureAuthUser, insertUserServiceController.handle);

module.exports = servicesRoutes;
