import type { Request, Response } from 'express'
import { DocumentService } from '../services'

export async function getDocuments(
  req: Request,
  res: Response
): Promise<Response> {
  const documents = await DocumentService.getDocuments()
  if (!documents)
    return res.status(500).json({ error: 'Error getting documents' })

  return res.status(200).json(documents)
}
