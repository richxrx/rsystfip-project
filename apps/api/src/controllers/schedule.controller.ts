import type { Request, Response } from "express";
import { AppointmentStatus, type IAppointment } from "../interfaces";
import { ScheduleService } from "../services";
import { idSchema, scheduleSchema } from "../validation/schemas";

export async function getSchedule(
  req: Request,
  res: Response,
): Promise<Response> {
  const schedules = await ScheduleService.getSchedules();
  if (!schedules)
    return res.status(500).json({ error: "Error getting schedules" });

  return res.status(200).json(schedules);
}

export async function createSchedule(
  req: Request,
  res: Response,
): Promise<Response> {
  const { error, value } = scheduleSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });

  const scheduleCreated = await ScheduleService.createSchedule(
    value as IAppointment,
  );
  if (!scheduleCreated)
    return res.status(500).json({ error: "Error creating schedule" });

  return res
    .status(201)
    .json({ ok: "Appointment created successfully", scheduleCreated });
}

export async function cancellSchedule(
  req: Request,
  res: Response,
): Promise<Response> {
  const { error, value } = idSchema.validate(req.params);
  if (error) return res.status(400).json({ error: error.message });

  const scheduleFound = await ScheduleService.getSchedule(value.id);
  if (!scheduleFound)
    return res.status(404).json({ error: "Schedule not found" });

  if (scheduleFound.status === AppointmentStatus.cancelled)
    return res.status(400).json({ error: "Schedule already cancelled" });

  const newScheduleCancelled: Partial<IAppointment> = {
    status: AppointmentStatus.cancelled,
  };
  const scheduleCancelled = await ScheduleService.updateSchedule(
    newScheduleCancelled,
    scheduleFound.person_id,
    scheduleFound.start_time,
  );
  if (!scheduleCancelled)
    return res.status(500).json({ error: "Schedule not cancelled" });

  return res.status(200).json({
    ok: "Cancellation schedule pending...",
    scheduleCancelled: { ...scheduleFound, ...scheduleCancelled },
  });
}
