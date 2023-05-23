const Router = require("express");
const CreateServiceController = require("../../../../modules/services/useCases/createService/createServiceController");
const ensureAdminUser = require("../middlewares/ensureAdminUser");
const ensureAuthUser = require("../middlewares/ensureAuthUser");

const servicesRoutes = Router();

const createServiceController = new CreateServiceController();

servicesRoutes.post(
  "/",
  ensureAuthUser,
  ensureAdminUser,
  createServiceController.handle
);

module.exports = servicesRoutes;
