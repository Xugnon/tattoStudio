const Router = require("express");
const CreateUserController = require("../../../../modules/users/useCases/createUser/createUserController");

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post("/", createUserController.handle);

module.exports = usersRoutes;
