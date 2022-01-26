
import authCtrl from "../controllers/auth.controller";

var authRouter = require("express").Router();



authRouter.post("/", authCtrl.loginUser);


export default authRouter;
