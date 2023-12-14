import Joi from 'joi'
import { JoiDefaults } from '.'

export const statusSchema = JoiDefaults.object({
  status: Joi.string()
    .valid('daily', 'scheduled') // excludes "cancelled"
    .required()
    .messages({ 'any.only': 'Error, status not valid' })
})
