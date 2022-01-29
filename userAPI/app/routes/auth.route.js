
import authCtrl from "../controllers/auth.controller";

var authRouter = require("express").Router();



authRouter.post("/login", authCtrl.loginUser);


export default authRouter;
