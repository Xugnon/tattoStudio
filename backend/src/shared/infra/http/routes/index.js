const Router = require("express");

const usersRoutes = require("./users.routes");
const servicesRoutes = require("./services.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/services", servicesRoutes);

module.exports = routes;
