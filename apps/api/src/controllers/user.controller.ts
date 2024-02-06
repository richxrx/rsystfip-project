import type { Request, Response } from "express";
import * as bcryptHelper from "../helpers/bcrypt.helper";
import type { IUser } from "../interfaces";
import { UserService } from "../services";
import { idSchema, userSchema } from "../validation/schemas";

export async function getUser(req: Request, res: Response): Promise<Response> {
  const { error, value } = idSchema.validate(req.params);
  if (error) return res.status(400).json({ error: error.message });

  const userFound = await UserService.getUser(value.id);
  if (!userFound) return res.status(404).json({ error: "User not found" });

  return res.status(200).json(userFound);
}

export async function getUsers(req: Request, res: Response): Promise<Response> {
  const usersFound = await UserService.getUsers();
  if (!usersFound)
    return res.status(500).json({ error: "Error getting users" });

  return res.status(200).json(usersFound);
}

export async function deleteUser(
  req: Request,
  res: Response,
): Promise<Response> {
  const { error, value } = idSchema.validate(req.params);
  if (error) return res.status(400).json({ error: error.message });

  const userDeleted = await UserService.deleteUser(value.id);
  if (!userDeleted)
    return res.status(500).json({ error: "Error deleting user" });

  return res.status(200).json({ ok: "User deleted successfully", userDeleted });
}

export async function createUser(
  req: Request,
  res: Response,
): Promise<Response> {
  const { error, value } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });

  const userExists = await UserService.getUser(+value.role_id - 1, value.email);
  if (!userExists) {
    const newUser: Partial<IUser> = {
      id: +value.role_id - 1,
      document_id: value.document_id,
      document_number: value.document_number,
      first_name: value.first_name,
      last_name: value.last_name,
      role_id: value.role_id,
      phone_number: value.phone_number,
      email: value.email,
      password: await bcryptHelper.encryptPassword(value.password),
    };
    const userCreated = await UserService.createUser(newUser);
    if (!userCreated)
      return res.status(500).json({ error: "Error creating user" });

    return res
      .status(201)
      .json({ ok: "User created successfully", userCreated });
  }

  if (value.email === userExists.email)
    return res.status(409).json({ error: "Email already registered" });

  return res.status(409).json({ error: "User already exists" });
}
