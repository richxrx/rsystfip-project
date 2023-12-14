import { Router } from 'express'
import { scheduleCtrl } from '../controllers'

const router = Router()

router
  .route('/')
  .get(scheduleCtrl.getSchedule)
  .post(scheduleCtrl.createSchedule)

router.route('/:id').patch(scheduleCtrl.cancellSchedule)

export default router
