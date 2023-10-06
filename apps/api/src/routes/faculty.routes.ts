import { Router } from 'express'
import * as facultyCtrl from '../controllers/faculty.controller'

const router = Router()

router.route('/').get(facultyCtrl.getFaculties)

export default router
