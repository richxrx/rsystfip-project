import Joi from 'joi'
import { emailSchema } from '.'

export const peopleSchema = emailSchema.keys({
  category_id: Joi.string().length(1).required(),
  first_name: Joi.string().min(3).max(25).required(),
  last_name: Joi.string().min(3).max(25).required(),
  document_id: Joi.string().length(1).required(),
  document_number: Joi.string()
    .regex(/^[0-9]+$/)
    .min(8)
    .max(10)
    .required()
    .messages({ 'string.pattern.base': '"document" invalid' }),
  phone_number: Joi.string()
    .regex(/^[0-9]+$/)
    .length(10)
    .messages({ 'string.pattern.base': '"phone_number" invalid' })
    .required(),
  faculty_id: Joi.string().length(1).required()
})
