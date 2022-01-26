import usersController from '../controllers/usersController';
var usersRouter = require("express").Router();

// Get all users
usersRouter.get("/all", usersController.findAllUser);

//Search
usersRouter.get("/search_user", usersController.search);

//Get by id
usersRouter.get("/:id", usersController.findUserById);

// Get user emprunts
usersRouter.get("/emprunts/:userID", usersController.getUserEmprunts);

//Add user
usersRouter.post("/add", usersController.addUser);

//Delete user
usersRouter.delete("/:id", usersController.deleteUserById);

//Update user
usersRouter.put("/:id", usersController.UpdateUserById);


export default usersRouter;