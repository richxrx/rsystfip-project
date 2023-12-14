import Joi from 'joi'

export const JoiDefaults = Joi.defaults(scheme =>
  scheme.options({ abortEarly: false })
)
