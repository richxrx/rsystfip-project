import { Router } from "express";
import * as peopleCtrl from "../controllers/people.controller";

const router = Router();

router.route("/").get(peopleCtrl.getPeople).post(peopleCtrl.createPerson);

router.route("/cancelled").get(peopleCtrl.getCancelledPeople);

router.route("/:id").get(peopleCtrl.getPerson).patch(peopleCtrl.updatePerson);

export default router;
