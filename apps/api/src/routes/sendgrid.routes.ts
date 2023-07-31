import { Router } from 'express';
import * as sgCtrl from '../controllers/sendgrid.controller';

const router = Router();

router.route('/').post(sgCtrl.sendEmail);

export default router;
