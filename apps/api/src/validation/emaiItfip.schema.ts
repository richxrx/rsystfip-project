import Joi from 'joi'
import { JoiDefaults } from '.'

export const emailItfipSchema = JoiDefaults.object({
  email: Joi.string()
    .min(10)
    .max(30)
    .email({
      minDomainSegments: 3,
      maxDomainSegments: 3,
      tlds: { allow: ['co'] }
    })
    .regex(/^[A-Za-z0-9._%+-]+@itfip\.edu\.co$/)
    .required()
    .messages({
      'string.pattern.base':
        '"email" does not belong to the itfip.edu.co domain'
    })
})
