import type { Request, Response } from "express";
import { CategoryService } from "../services";

export async function getCategories(
  req: Request,
  res: Response,
): Promise<Response> {
  const categories = await CategoryService.getCategories();
  if (!categories)
    return res.status(500).json({ error: "Error getting categories" });

  return res.status(200).json(categories);
}
