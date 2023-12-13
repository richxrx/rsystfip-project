import type { NextFunction, Request, Response } from 'express'
import type { IPayload } from '../interfaces/IPayload'

export default function watchRole(...allowedRoles: Array<string>) {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
    const rolesUser = req.payloadUser as IPayload
    const isAllowed = allowedRoles.includes(rolesUser.role_name)
    if (isAllowed) return next()

    return res.status(401).json({ error: 'Access denied' })
  }
}
