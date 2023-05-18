const Router = require("express");
const CreateUserController = require("../../../../modules/users/useCases/createUser/createUserController");
const AuthenticateUserController = require("../../../../modules/users/useCases/authenticateUser/authenticateController");
const ShowUserController = require("../../../../modules/users/useCases/showUsers/showUserController");
const ensureAuthUser = require("../middlewares/ensureAuthUser");

const usersRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const showUserController = new ShowUserController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.post("/auth", authenticateUserController.handle);
usersRoutes.get("/", ensureAuthUser, showUserController.handle);

module.exports = usersRoutes;
