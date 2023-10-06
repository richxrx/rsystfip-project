import { RowDataPacket } from 'mysql2'
import { connect } from '../db'
import { IFaculty } from '../interfaces/IFaculty'

export async function getFaculties(): Promise<Array<IFaculty> | null> {
  const conn = connect()
  if (!conn) return null
  const [rows] = await conn.query<Array<RowDataPacket>>(
    'SELECT * FROM Faculties'
  )
  await conn.end()
  return rows as Array<IFaculty>
}
