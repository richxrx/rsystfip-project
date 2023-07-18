import { Router } from "express";
import * as documentCtrl from "../controllers/document.controller";

const router = Router();

router.route("/").get(documentCtrl.getDocuments);

export default router;
