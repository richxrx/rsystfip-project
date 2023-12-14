import { Router } from 'express'
import { sessionCtrl } from '../controllers'

const router = Router()

router.route('/verify-jwt-of-session').post(sessionCtrl.verifyJwtOfSession)

export default router
