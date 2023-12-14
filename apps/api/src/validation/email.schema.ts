import Joi from 'joi'
import { JoiDefaults } from '.'

export const emailSchema = JoiDefaults.object({
  email: Joi.string()
    .min(10)
    .max(30)
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 3,
      tlds: { allow: false }
    })
    .required()
})
