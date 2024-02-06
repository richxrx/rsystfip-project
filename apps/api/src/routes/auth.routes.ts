import { Router } from "express";
import { authCtrl } from "../controllers";

const router = Router();

router.route("/").post(authCtrl.auth);

export default router;
