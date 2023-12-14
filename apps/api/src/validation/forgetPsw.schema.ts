import Joi from 'joi'
import { JoiDefaults } from '.'

export const forgetPswSchema = JoiDefaults.object({
  resetToken: Joi.string().required(),
  password: Joi.string().min(8).max(30).required(),
  password2: Joi.string()
    .valid(Joi.ref('password'), '')
    .min(8)
    .max(30)
    .required()
    .messages({ 'any.only': 'Passwords does not match' })
})
