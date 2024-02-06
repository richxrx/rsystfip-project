import { Router } from "express";
import { documentCtrl } from "../controllers";

const router = Router();

router.route("/").get(documentCtrl.getDocuments);

export default router;
