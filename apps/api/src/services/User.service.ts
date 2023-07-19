import { ResultSetHeader, RowDataPacket } from "mysql2";
import { connect } from "../db";
import { IUser } from "../interfaces/IUser";

export async function getUser(
  id?: IUser["id"],
  email?: string
): Promise<IUser | null> {
  const conn = connect();
  if (!conn) return null;
  const [rows] = await conn.query<Array<RowDataPacket>>(
    "SELECT u.id, u.name, u.email, u.password, u.role, r.permissions FROM users u INNER JOIN roles r ON u.role = r.id WHERE u.email = ? OR u.id = ?",
    [email, id]
  );
  await conn.end();
  return rows[0] as IUser;
}

export async function getUsers(): Promise<Array<IUser> | null> {
  const conn = connect();
  if (!conn) return null;
  const [rows] = await conn.query<Array<RowDataPacket>>("SELECT * FROM users");
  await conn.end();
  return rows as Array<IUser>;
}

export async function createUser(user: IUser): Promise<IUser | null> {
  const conn = connect();
  if (!conn) return null;
  const [result] = await conn.query<ResultSetHeader>(
    "INSERT INTO users SET ?",
    [user]
  );
  await conn.end();
  delete user.password;
  return result.affectedRows > 0 ? { ...user, id: result.insertId } : null;
}

export async function deleteUser(id: IUser["id"]): Promise<boolean> {
  const conn = connect();
  if (!conn) return false;
  const [result] = await conn.query<ResultSetHeader>(
    "DELETE FROM users WHERE id = ?",
    [id]
  );
  await conn.end();
  return result.affectedRows > 0;
}

export async function updateUser(
  id: IUser["id"],
  user: IUser
): Promise<IUser | null> {
  const conn = connect();
  if (!conn) return null;
  const [result] = await conn.query<ResultSetHeader>(
    "UPDATE users SET ? WHERE id = ?",
    [user, id]
  );
  await conn.end();
  return result.affectedRows > 0 ? user : null;
}
