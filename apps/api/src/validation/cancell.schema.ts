import Joi from 'joi'
import { JoiDefaults } from '.'

export const cancellSchema = JoiDefaults.object({
  person_id: Joi.string().min(1).max(11).required(),
  cancellation_subject: Joi.string().min(10).max(150).required()
})
