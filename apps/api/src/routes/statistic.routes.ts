import { Router } from 'express'
import { statisticCtrl } from '../controllers'

const router = Router()

router.route('/:status').get(statisticCtrl.getStatistics)

router.route('/onrange/:status').get(statisticCtrl.getMostAgendatedOnRange)

router.route('/alltime/:status').get(statisticCtrl.getMostAgendatedAllTime)

export default router
