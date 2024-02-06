import { Router } from "express";
import { cancellationCtrl } from "../controllers";

const router = Router();

router.route("/").post(cancellationCtrl.createCancellation);

export default router;
