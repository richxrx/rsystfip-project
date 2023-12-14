import Joi from 'joi'
import { emailSchema } from '.'

export const sendEmailSchema = emailSchema.keys({
  subject: Joi.string().min(5).max(50).required(),
  html: Joi.string().min(10).required()
})
