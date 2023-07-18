import { Router } from "express";
import * as categoryCtrl from "../controllers/category.controller";

const router = Router();

router.route("/").get(categoryCtrl.getCategories);

export default router;
