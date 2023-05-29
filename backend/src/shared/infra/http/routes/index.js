const Router = require("express");

const usersRoutes = require("./users.routes");
const servicesRoutes = require("./services.routes");
const schedulesRoutes = require("./schedules.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/services", servicesRoutes);
routes.use("/schedules", schedulesRoutes);

module.exports = routes;
