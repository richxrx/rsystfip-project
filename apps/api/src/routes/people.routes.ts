import { Router } from 'express'
import { peopleCtrl } from '../controllers'

const router = Router()

router.route('/').get(peopleCtrl.getPeople).post(peopleCtrl.createPerson)

router.route('/cancelled').get(peopleCtrl.getCancelledPeople)

router.route('/:id').get(peopleCtrl.getPerson).put(peopleCtrl.updatePerson)

export default router
