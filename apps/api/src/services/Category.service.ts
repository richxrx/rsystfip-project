import { RowDataPacket } from 'mysql2';
import { connect } from '../db';
import { ICategory } from '../interfaces/ICategory';

export async function getCategories(): Promise<Array<ICategory> | null> {
  const conn = connect();
  if (!conn) return null;
  const [rows] = await conn.query<Array<RowDataPacket>>(
    'SELECT * FROM Categories',
  );
  await conn.end();
  return rows as Array<ICategory>;
}
