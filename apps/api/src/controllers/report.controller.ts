import { Request, Response } from "express";
import * as ReportService from "../services/Report.service";
import { filterSchema } from "../validation/schemas";

export async function getReports(
  req: Request,
  res: Response
): Promise<Response> {
  const { error, value } = filterSchema.validate(req.query);
  if (error) return res.status(400).json({ error: error.message });

  const reports = await ReportService.getReports(
    value.start_time,
    value.end_time
  );
  if (!reports) return res.status(500).json({ error: "Error getting reports" });

  return res.status(200).json(reports);
}

export async function getReportCount(
  req: Request,
  res: Response
): Promise<Response> {
  const { error, value } = filterSchema.validate(req.query);
  if (error) return res.status(400).json({ error: error.message });

  const count = await ReportService.getReportCount(
    value.start_time,
    value.end_time
  );
  if (!count)
    return res.status(500).json({ error: "Error getting report count" });

  return res.status(200).json(count);
}

export async function getReportCounts(
  req: Request,
  res: Response
): Promise<Response> {
  const counts = await ReportService.getReportCounts();
  if (!counts)
    return res.status(500).json({ error: "Error getting report counts" });

  return res.status(200).json(counts);
}
