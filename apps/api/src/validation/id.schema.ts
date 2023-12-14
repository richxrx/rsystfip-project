import Joi from 'joi'
import { JoiDefaults } from '.'

export const idSchema = JoiDefaults.object({
  id: Joi.string().min(1).max(11).required()
})
