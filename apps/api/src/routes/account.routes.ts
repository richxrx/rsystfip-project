import { Router } from 'express'
import * as accountCtrl from '../controllers/account.controller'
import * as sgCtrl from '../controllers/sendgrid.controller'
import authMiddleware from '../middlewares/auth.middleware'

const router = Router()

router
  .route('/send-jwt-for-recover-password')
  .post(accountCtrl.sendJwtForRecoverPassword, sgCtrl.sendEmail)

router
  .route('/verify-jwt-for-recover-password')
  .get(accountCtrl.verifyJwtForRecoverPassword)

router.route('/update-password').patch(accountCtrl.updatePasswordWithJwt)

router
  .route('/update-password/:id')
  .patch(authMiddleware(), accountCtrl.updatePassword)

export default router
