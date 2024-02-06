import { Router } from "express";
import { deanCtrl } from "../controllers";

const router = Router();

router.route("/").get(deanCtrl.getDeans).post(deanCtrl.createDean);

export default router;
