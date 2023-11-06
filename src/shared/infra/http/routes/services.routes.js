const Router = require("express");

const ensureAdminUser = require("../middlewares/ensureAdminUser");
const ensureAuthUser = require("../middlewares/ensureAuthUser");
const CreateServiceController = require("../../../../modules/services/useCases/createService/createServiceController");
const GetAvailableServicesController = require("../../../../modules/services/useCases/getAvailableServices/getAvailableServicesController");
const InsertUserServiceController = require("../../../../modules/services/useCases/insertUserService/insertUserServiceController");
const CancelServiceController = require("../../../../modules/services/useCases/cancelService/cancelServiceController");
const DeleteServiceController = require("../../../../modules/services/useCases/deleteService/deleteServiceController");

const servicesRoutes = Router();

const createServiceController = new CreateServiceController();
const getAvailableServicesController = new GetAvailableServicesController();
const insertUserServiceController = new InsertUserServiceController();
const cancelServiceController = new CancelServiceController();
const deleteServiceController = new DeleteServiceController();

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

servicesRoutes.delete(
  "/:id",
  ensureAuthUser,
  ensureAdminUser,
  deleteServiceController.handle
);

module.exports = servicesRoutes;
