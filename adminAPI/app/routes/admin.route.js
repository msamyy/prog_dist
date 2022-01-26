import adminCtrl from "../controllers/adminController";
var adminRouter = require("express").Router();



adminRouter.get("/all", adminCtrl.findAllAdmin);

adminRouter.post("/add", adminCtrl.addAdmin);


export default adminRouter;