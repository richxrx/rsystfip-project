import { Router } from 'express'
import { sgCtrl } from '../controllers'

const router = Router()

router.route('/').post(sgCtrl.sendEmail)

export default router
