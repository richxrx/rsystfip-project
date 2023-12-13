import type { Request, Response } from 'express'
import type { IPeople } from '../interfaces/IPeople'
import * as PeopleService from '../services/People.service'
import {
  idSchema,
  peopleEditSchema,
  schedulerSchema
} from '../validation/schemas'

export async function createPerson(
  req: Request,
  res: Response
): Promise<Response> {
  const { error, value } = schedulerSchema.validate(req.body)
  if (error) return res.status(400).json({ error: error.message })

  const newPerson: IPeople = {
    first_name: value.first_name,
    last_name: value.last_name,
    document_id: value.document_id,
    document_number: value.document_number,
    phone_number: value.phone_number,
    email: value.email,
    category_id: value.category_id,
    faculty_id: value.faculty_id
  }
  const personCreated = await PeopleService.createPerson(newPerson)
  if (!personCreated)
    return res.status(500).json({ error: 'Error creating person' })

  return res
    .status(201)
    .json({ ok: 'Person created successfully', personCreated })
}

export async function getPerson(
  req: Request,
  res: Response
): Promise<Response> {
  const { error, value } = idSchema.validate(req.params)
  if (error) return res.status(400).json({ error: error.message })

  const personFound = await PeopleService.getPerson(value.id)
  if (!personFound) return res.status(404).json({ error: 'Person not found' })

  return res.status(200).json(personFound)
}

export async function updatePerson(
  req: Request,
  res: Response
): Promise<Response> {
  const { error, value } = peopleEditSchema.validate({
    ...req.params,
    ...req.body
  })
  if (error) return res.status(400).json({ error: error.message })

  const personFound = await PeopleService.getPerson(value.id)
  if (!personFound) return res.status(404).json({ error: 'Person not found' })

  const dataPerson: IPeople = {
    first_name: value.first_name,
    last_name: value.last_name,
    document_id: value.document_id,
    document_number: value.document_number,
    category_id: value.category_id,
    faculty_id: value.faculty_id,
    email: value.email,
    phone_number: value.phone_number
  }
  const peopleEdited = await PeopleService.updatePerson(value.id, dataPerson)
  if (!peopleEdited)
    return res.status(500).json({ error: 'None person updated' })

  return res
    .status(200)
    .json({ ok: 'Person updated successfully', peopleEdited })
}

export async function getPeople(
  req: Request,
  res: Response
): Promise<Response> {
  const peopleFound = await PeopleService.getPeople()
  if (!peopleFound)
    return res.status(500).json({ error: 'Error getting people' })

  return res.status(200).json(peopleFound)
}

export async function getCancelledPeople(
  req: Request,
  res: Response
): Promise<Response> {
  const peopleCancelled = await PeopleService.getCancelledPeople()
  if (!peopleCancelled)
    return res.status(500).json({ error: 'Error getting cancelled people' })

  return res.status(200).json(peopleCancelled)
}
