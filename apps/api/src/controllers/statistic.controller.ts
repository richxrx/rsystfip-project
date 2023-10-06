import { Request, Response } from 'express'
import * as StatisticService from '../services/Statistic.service'
import { statisticfilterSchema, statusSchema } from '../validation/schemas'

export async function getStatistics(
  req: Request,
  res: Response
): Promise<Response> {
  const { error, value } = statisticfilterSchema.validate({
    ...req.params,
    ...req.query
  })
  if (error) return res.status(400).json({ error: error.message })

  const statistics = await StatisticService.getStatistics(
    value.status,
    value.start_time,
    value.end_time
  )
  if (!statistics)
    return res.status(500).json({ error: 'Error getting statistics' })

  return res.status(200).json(statistics)
}

export async function getMostAgendatedOnRange(
  req: Request,
  res: Response
): Promise<Response> {
  const { error, value } = statisticfilterSchema.validate({
    ...req.params,
    ...req.query
  })
  if (error) return res.status(400).json({ error: error.message })

  const statistics = await StatisticService.getMostAgendatedOnRange(
    value.status,
    value.start_time,
    value.end_time
  )
  if (!statistics)
    return res.status(500).json({ error: 'Error getting statistics' })

  return res.status(200).json(statistics)
}

export async function getMostAgendatedAllTime(
  req: Request,
  res: Response
): Promise<Response> {
  const { error, value } = statusSchema.validate(req.params)
  if (error) return res.status(400).json({ error: error.message })

  const statistics = await StatisticService.getMostAgendatedAllTime(
    value.status
  )
  if (!statistics)
    return res.status(500).json({ error: 'Error getting statistics' })

  return res.status(200).json(statistics)
}
