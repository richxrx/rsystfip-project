import type { Request, Response } from "express";
import * as sgHelper from "../helpers/sg.helper";
import { sendEmailSchema } from "../validation/schemas";

export async function sendEmail(
  req: Request,
  res: Response,
): Promise<Response> {
  const { error, value } = sendEmailSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });

  const { email: to, subject, html } = value;

  const msgSended = await sgHelper.sendEmail(to, subject, html);
  if (!msgSended?.response)
    return res.status(500).json({ error: `Error sending email to ${to}` });

  return res.status(200).json({ ok: `Email sended to ${to}` });
}
