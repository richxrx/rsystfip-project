import { ResultSetHeader, RowDataPacket } from "mysql2";
import { connect } from "../db";
import { IPeople } from "../interfaces/IPeople";

export async function createPerson(person: IPeople): Promise<IPeople | null> {
  const conn = connect();
  if (!conn) return null;
  const [result] = await conn.query<ResultSetHeader>(
    "INSERT INTO people SET ?",
    [person]
  );
  await conn.end();
  return result.affectedRows > 0 ? { ...person, id: result.insertId } : null;
}

export async function getPerson(id: IPeople["id"]): Promise<IPeople | null> {
  const conn = connect();
  if (!conn) return null;
  const [rows] = await conn.query<Array<RowDataPacket>>(
    "SELECT * FROM people WHERE id = ?",
    [id]
  );
  await conn.end();
  return rows[0] as IPeople;
}

export async function updatePerson(
  id: IPeople["id"],
  person: IPeople
): Promise<IPeople | null> {
  const conn = connect();
  if (!conn) return null;
  const [result] = await conn.query<ResultSetHeader>(
    "UPDATE people SET ? WHERE id = ?",
    [person, id]
  );
  await conn.end();
  return result.affectedRows > 0 ? person : null;
}

export async function getPeople(): Promise<Array<IPeople> | null> {
  const conn = connect();
  if (!conn) return null;
  const [rows] = await conn.query<Array<RowDataPacket>>(
    "SELECT p.id, p.name, d.document AS ty_doc, c.category, p.faculty_id, d.description, p.document_number, f.facultie, p.telephone, p.email, p.come_asunt FROM people p INNER JOIN documents d ON p.document_id = d.id INNER JOIN faculties f ON p.faculty_id = f.id INNER JOIN categories c ON p.category_id = c.id ORDER BY p.id DESC"
  );
  await conn.end();
  return rows as Array<IPeople>;
}

export async function getCancelledPeople(): Promise<Array<IPeople> | null> {
  const conn = connect();
  if (!conn) return null;
  const [rows] = await conn.query<Array<RowDataPacket>>(
    "SELECT p.id, p.name, d.document AS ty_doc, c.category, p.faculty_id, d.description, p.document_number, f.facultie, l.cancelled_asunt FROM people p INNER JOIN documents d ON p.document_id = d.id INNER JOIN faculties f ON p.faculty_id = f.id INNER JOIN categories c ON p.category_id = c.id INNER JOIN cancelled l ON p.id = l.person_id INNER JOIN scheduling s ON s.person_id = l.person_id WHERE s.status = 'cancelled' ORDER BY p.id DESC"
  );
  await conn.end();
  return rows as Array<IPeople>;
}
