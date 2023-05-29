const Router = require("express");

const ensureAdminUser = require("../middlewares/ensureAdminUser");
const ensureAuthUser = require("../middlewares/ensureAuthUser");
const CreateServiceController = require("../../../../modules/services/useCases/createService/createServiceController");
const GetAvailableServicesController = require("../../../../modules/services/useCases/getAvailableServices/getAvailableServicesController");
const InsertUserServiceController = require("../../../../modules/services/useCases/insertUserService/insertUserServiceController");
const CancelServiceController = require("../../../../modules/services/useCases/cancelService/cancelServiceController");

const servicesRoutes = Router();

const createServiceController = new CreateServiceController();
const getAvailableServicesController = new GetAvailableServicesController();
const insertUserServiceController = new InsertUserServiceController();
const cancelServiceController = new CancelServiceController();

servicesRoutes.post(
  "/",
  ensureAuthUser,
  ensureAdminUser,
  createServiceController.handle
);

servicesRoutes.get("/", ensureAuthUser, getAvailableServicesController.handle);

servicesRoutes.put("/:id", ensureAuthUser, insertUserServiceController.handle);

servicesRoutes.put(
  "/cancel/:id",
  ensureAuthUser,
  cancelServiceController.handle
);

module.exports = servicesRoutes;
