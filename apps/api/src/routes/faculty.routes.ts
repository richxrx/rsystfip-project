import { Router } from "express";
import { facultyCtrl } from "../controllers";

const router = Router();

router.route("/").get(facultyCtrl.getFaculties);

export default router;
