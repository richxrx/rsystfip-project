import Joi from 'joi'
import { JoiDefaults } from '.'

export const authSchema = JoiDefaults.object({
  username: Joi.string().min(5).max(255).required(),
  password: Joi.string().min(8).max(30).required()
})
