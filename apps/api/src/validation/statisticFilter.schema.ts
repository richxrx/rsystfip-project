import Joi from 'joi'
import { statusSchema } from '.'

export const statisticfilterSchema = statusSchema.keys({
  start_time: Joi.string().required(),
  end_time: Joi.string().required()
})
