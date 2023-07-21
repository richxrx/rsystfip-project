import Joi from "joi";
import { AppointmentStatus } from "../features/programming/programmingSlice";

const JoiDefaults = Joi.defaults((scheme) =>
  scheme.options({ abortEarly: false })
);

export const statusSchema = JoiDefaults.object({
  status: Joi.string()
    .valid("daily", "scheduled") // excludes "cancelled"
    .required()
    .messages({ "any.only": "Error, status not valid" }),
});

export const idSchema = JoiDefaults.object({
  id: Joi.string().min(1).max(11).required(),
});

export const emailItfipSchema = JoiDefaults.object({
  email: Joi.string()
    .min(10)
    .max(30)
    .email({
      minDomainSegments: 3,
      maxDomainSegments: 3,
      tlds: { allow: ["co"] },
    })
    .regex(/^[A-Za-z0-9._%+-]+@itfip\.edu\.co$/)
    .required()
    .messages({
      "string.pattern.base":
        '"email" does not belong to the itfip.edu.co domain',
    }),
});

export const authSchema = JoiDefaults.object({
  username: Joi.string().min(5).max(255).required(),
  password: Joi.string().min(8).max(30).required(),
});

export const cancellSchema = JoiDefaults.object({
  person_id: Joi.string().min(1).max(11).required(),
  cancellation_subject: Joi.string().min(10).max(150).required(),
});

export const changePswSchema = idSchema.keys({
  current_password: Joi.string().min(8).max(30).required(),
  new_password: Joi.string()
    .min(8)
    .max(30)
    .required()
    .invalid(Joi.ref("current_password"))
    .messages({
      "any.invalid": "The new password must be different from the old password",
    }),
  new_password_confirm: Joi.string()
    .valid(Joi.ref("new_password"), "")
    .min(8)
    .max(30)
    .required()
    .invalid(Joi.ref("current_password"))
    .messages({
      "any.invalid": "The new password must be different from the old password",
      "any.only": "Passwords does not match",
    }),
});

export const forgetPswSchema = JoiDefaults.object({
  resetToken: Joi.string().required(),
  password: Joi.string().min(8).max(30).required(),
  password_confirm: Joi.string()
    .valid(Joi.ref("password"), "")
    .min(8)
    .max(30)
    .required()
    .messages({ "any.only": "Passwords does not match" }),
});

export const deanSchema = JoiDefaults.object({
  id: Joi.string()
    .regex(/^[0-9]+$/)
    .min(8)
    .max(10)
    .required()
    .messages({ "string.pattern.base": '"document" invalid' }),
  first_name: Joi.string().min(3).max(25).required(),
  last_name: Joi.string().min(3).max(25).required(),
  faculty_id: Joi.string().length(1).required(),
});

export const userSchema = emailItfipSchema.keys({
  role_id: Joi.string().length(1).required(),
  first_name: Joi.string().min(3).max(25).required(),
  last_name: Joi.string().min(3).max(25).required(),
  document_id: Joi.string().length(1).required(),
  document_number: Joi.string()
    .regex(/^[0-9]+$/)
    .min(8)
    .max(10)
    .required()
    .messages({ "string.pattern.base": '"document" invalid' }),
  phone_number: Joi.string()
    .regex(/^[0-9]+$/)
    .length(10)
    .required()
    .messages({ "string.pattern.base": '"telephone" invalid' }),
  password: Joi.string().min(8).max(30).required(),
  password_confirm: Joi.string()
    .valid(Joi.ref("password"))
    .min(8)
    .max(30)
    .required()
    .messages({ "any.only": "Passwords does not match" }),
});

export const peopleSchema = JoiDefaults.object({
  category_id: Joi.string().length(1).required(),
  first_name: Joi.string().min(3).max(25).required(),
  last_name: Joi.string().min(3).max(25).required(),
  document_id: Joi.string().length(1).required(),
  document_number: Joi.string()
    .regex(/^[0-9]+$/)
    .min(8)
    .max(10)
    .required()
    .messages({ "string.pattern.base": '"document" invalid' }),
  email: Joi.string()
    .min(10)
    .max(30)
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 3,
      tlds: { allow: false },
    })
    .required(),
  phone_number: Joi.string()
    .regex(/^[0-9]+$/)
    .length(10)
    .messages({ "string.pattern.base": '"telephone" invalid' })
    .required(),
  faculty_id: Joi.string().length(1).required(),
});

export const peopleEditSchema = peopleSchema.concat(idSchema);

export const schedulerSchema = peopleSchema
  .keys({
    start_time: Joi.when("status", {
      is: AppointmentStatus.scheduled,
      then: Joi.string().required(),
      otherwise: Joi.optional(),
    }),
    end_time: Joi.when("status", {
      is: AppointmentStatus.scheduled,
      then: Joi.string().required(),
      otherwise: Joi.optional(),
    }),
    visit_subject: Joi.string().min(10).max(150).required(),
    color: Joi.string().min(4).max(7).required(),
  })
  .concat(statusSchema);
