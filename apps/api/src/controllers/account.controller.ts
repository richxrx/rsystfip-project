import { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import * as bcryptHelper from "../helpers/bcrypt.helper";
import * as sgHelper from "../helpers/sg.helper";
import { IPayload } from "../interfaces/IPayload";
import { IUser } from "../interfaces/IUser";
import * as UserService from "../services/User.service";
import {
  changePswSchema,
  emailItfipSchema,
  forgetPswSchema,
} from "../validation/schemas";

export async function verifyJwtForRecoverPassword(
  req: Request,
  res: Response
): Promise<Response> {
  const jwt = req.headers.authorization;
  if (!jwt) return res.status(401).json("Unauthorized");

  try {
    const payload = Jwt.verify(jwt, SECRET_KEY || "secretkey") as IPayload;
    return res.status(200).json({ tokenIsValid: true, email: payload.email });
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
}

export async function sendJwtForRecoverPassword(
  req: Request,
  res: Response
): Promise<Response> {
  const { error, value } = emailItfipSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });

  const userFound = await UserService.getUser(undefined, value.email);
  if (!userFound)
    return res.status(404).json({ error: "Email isn't registered" });

  const token = Jwt.sign(
    { userId: userFound.id, email: userFound.email },
    SECRET_KEY || "secretkey",
    { expiresIn: 3 * 60 }
  );
  const resetPasswordLink = `${req.headers.origin}/forget/my/password/${token}/recovery`;
  const msg = `Dear ${userFound.name}, we have received a request to change the password for your account. If it wasn't you, please ignore this email.<br>If it was you, please click on the following link to reset your password:<br>${resetPasswordLink}<br><strong>This link will expire in 3 minutes.</strong><br><br>Sincerely,<br>Team ITFIP - RSystfip`;

  const linkSended = await sgHelper.sendEmail(
    value.email,
    "Request of change password",
    msg
  );
  if (!linkSended?.response)
    return res.status(500).json({ error: "Error sending email" });

  return res.status(200).json({
    ok: `${userFound.name}, we will send you an email with instructions to reset your password at ${value.email}. Expires in 3 minutes.`,
  });
}

export async function updatePassword(
  req: Request,
  res: Response
): Promise<Response> {
  const { error, value } = changePswSchema.validate({
    ...req.body,
    ...req.params,
  });
  if (error) return res.status(400).json({ error: error.message });

  const userFound = await UserService.getUser(value.id);
  if (!userFound) return res.status(404).json({ error: "User not found" });

  const auth = await bcryptHelper.verifyPassword(
    value.current_password,
    userFound.password as string
  );
  if (!auth)
    return res.status(401).json({ error: "Current password incorrect" });

  const passwordChanged = await UserService.updateUser(userFound.id, {
    password: await bcryptHelper.encryptPassword(value.new_password),
  } as IUser);
  if (!passwordChanged)
    return res.status(500).json({ error: "Error updating password" });

  return res.status(200).json({ ok: "Password updated successfully" });
}

export async function updatePasswordWithJwt(
  req: Request,
  res: Response
): Promise<Response> {
  const { error, value } = forgetPswSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });

  try {
    const payload = Jwt.verify(
      value.resetToken,
      SECRET_KEY || "secretkey"
    ) as IPayload;

    const userFound = await UserService.getUser(payload.userId, payload.email);
    if (!userFound) return res.status(404).json({ error: "User not found" });

    const auth = await bcryptHelper.verifyPassword(
      value.password,
      userFound.password as string
    );
    if (auth) return res.status(400).json({ error: "None password updated" });

    const passwordChanged = await UserService.updateUser(userFound.id, {
      password: await bcryptHelper.encryptPassword(value.password),
    } as IUser);
    if (!passwordChanged)
      return res.status(500).json({ error: "Error updating password" });

    return res.status(200).json({ ok: "Password updated successfully" });
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
}
