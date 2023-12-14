import Joi from 'joi'
import { idSchema } from '.'

export const changePswSchema = idSchema.keys({
  current_password: Joi.string().min(8).max(30).required(),
  new_password: Joi.string()
    .min(8)
    .max(30)
    .required()
    .invalid(Joi.ref('current_password'))
    .messages({
      'any.invalid': 'The new password must be different from the old password'
    }),
  new_password_confirm: Joi.string()
    .valid(Joi.ref('new_password'), '')
    .min(8)
    .max(30)
    .required()
    .invalid(Joi.ref('current_password'))
    .messages({
      'any.invalid': 'The new password must be different from the old password',
      'any.only': 'Passwords does not match'
    })
})
