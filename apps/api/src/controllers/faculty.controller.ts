import type { Request, Response } from 'express'
import { FacultyService } from '../services'

export async function getFaculties(
  req: Request,
  res: Response
): Promise<Response> {
  const faculties = await FacultyService.getFaculties()
  if (!faculties)
    return res.status(500).json({ error: 'Error getting faculties' })

  return res.status(200).json(faculties)
}
