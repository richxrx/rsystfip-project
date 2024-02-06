import { Router } from "express";
import { categoryCtrl } from "../controllers";

const router = Router();

router.route("/").get(categoryCtrl.getCategories);

export default router;
