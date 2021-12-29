
import authCtrl from "../controllers/auth.controller";

var router = require("express").Router();



router.post("/admin", authCtrl.authAdmin);


export default router;
