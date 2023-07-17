import { ResultSetHeader, RowDataPacket } from "mysql2";
import { connect } from "../db";
import { IDean } from "../interfaces/IDean";

export async function getDean(id: IDean["id"]): Promise<IDean | null> {
  const conn = connect();
  if (!conn) return null;
  const [rows] = await conn.query<Array<RowDataPacket>>(
    "SELECT * FROM deans WHERE id = ?",
    [id]
  );
  return rows[0] as IDean;
}

export async function getDeans(): Promise<Array<IDean> | null> {
  const conn = connect();
  if (!conn) return null;
  const [rows] = await conn.query<Array<RowDataPacket>>("SELECT * FROM deans");
  return rows as Array<IDean>;
}

export async function createDean(dean: IDean): Promise<IDean | null> {
  const conn = connect();
  if (!conn) return null;
  const [result] = await conn.query<ResultSetHeader>(
    "INSERT INTO deans SET ?",
    [dean]
  );
  return result.affectedRows > 0 ? dean : null;
}
