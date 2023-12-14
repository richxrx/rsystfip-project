import Joi from 'joi'
import { JoiDefaults } from '.'

export const deanSchema = JoiDefaults.object({
  id: Joi.string()
    .regex(/^[0-9]+$/)
    .min(8)
    .max(10)
    .required()
    .messages({ 'string.pattern.base': '"document" invalid' }),
  first_name: Joi.string().min(3).max(25).required(),
  last_name: Joi.string().min(3).max(25).required(),
  faculty_id: Joi.string().length(1).required()
})
