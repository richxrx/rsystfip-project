import { Request, Response } from "express";
import * as Resource from "../models/Resource";

export async function getCategories(
  req: Request,
  res: Response
): Promise<Response> {
  const categories = await Resource.getCategories();
  if (!categories)
    return res.status(500).json({ error: "Error getting categories" });
  if (categories.length === 0)
    return res.status(404).json({ error: "No categories found" });

  return res.status(200).json(categories);
}

export async function getDocuments(
  req: Request,
  res: Response
): Promise<Response> {
  const documents = await Resource.getDocuments();
  if (!documents)
    return res.status(500).json({ error: "Error getting documents" });
  if (documents.length === 0)
    return res.status(404).json({ error: "No documents found" });

  return res.status(200).json(documents);
}

export async function getFaculties(
  req: Request,
  res: Response
): Promise<Response> {
  const faculties = await Resource.getFaculties();
  if (!faculties)
    return res.status(500).json({ error: "Error getting faculties" });
  if (faculties.length === 0)
    return res.status(404).json({ error: "No faculties found" });

  return res.status(200).json(faculties);
}
