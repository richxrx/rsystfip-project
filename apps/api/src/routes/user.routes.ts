import { Router } from "express";
import { userCtrl } from "../controllers";
import { roleMiddleware } from "../middlewares";

const router = Router();

router
  .route("/")
  .get(roleMiddleware("admin"), userCtrl.getUsers)
  .post(roleMiddleware("admin"), userCtrl.createUser);

router
  .route("/:id")
  .get(roleMiddleware("admin", "secretaria", "rector"), userCtrl.getUser)
  .delete(roleMiddleware("admin"), userCtrl.deleteUser);

export default router;
