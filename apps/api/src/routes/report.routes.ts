import { Router } from "express";
import { reportCtrl } from "../controllers";

const router = Router();

router.route("/").get(reportCtrl.getReports);

router.route("/count").get(reportCtrl.getReportCount);

router.route("/counts").get(reportCtrl.getReportCounts);

export default router;
