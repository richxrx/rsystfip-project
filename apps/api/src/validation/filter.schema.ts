import { AppointmentStatus } from 'interfaces'
import Joi from 'joi'
import { JoiDefaults } from '.'

// Only backend
export const filterSchema = JoiDefaults.object({
  start_time: Joi.when('status', {
    is: AppointmentStatus.scheduled,
    then: Joi.string().required(),
    otherwise: Joi.optional()
  }),
  end_time: Joi.when('status', {
    is: AppointmentStatus.scheduled,
    then: Joi.string().required(),
    otherwise: Joi.optional()
  })
})
