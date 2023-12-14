import { AppointmentStatus } from 'interfaces'
import Joi from 'joi'
import { peopleSchema, statusSchema } from '.'

export const schedulerSchema = peopleSchema
  .keys({
    start_time: Joi.when('status', {
      is: AppointmentStatus.scheduled,
      then: Joi.string().required(),
      otherwise: Joi.optional()
    }),
    end_time: Joi.when('status', {
      is: AppointmentStatus.scheduled,
      then: Joi.string().required(),
      otherwise: Joi.optional()
    }),
    visit_subject: Joi.string().min(10).max(150).required(),
    color: Joi.string().min(4).max(7).required()
  })
  .concat(statusSchema)
