import { idSchema, peopleSchema } from '.'

export const peopleEditSchema = peopleSchema.concat(idSchema)
