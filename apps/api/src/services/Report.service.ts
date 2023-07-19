import { RowDataPacket } from "mysql2";
import { connect } from "../db";
import { ICount } from "../interfaces/ICount";
import { IReport } from "../interfaces/IReport";
import { IScheduleData } from "../interfaces/IScheduleData";

export async function getReports(
  start: IScheduleData["start_date"],
  end: IScheduleData["end_date"]
): Promise<Array<IReport> | null> {
  const conn = connect();
  if (!conn) return null;
  const [rows] = await conn.query<Array<RowDataPacket>>(
    "SELECT p.name, s.start_date AS date, s.modification AS time, SUM(CASE WHEN s.status = 'scheduled' THEN 1 ELSE 0 END) AS scheduling_count, SUM(CASE WHEN s.status = 'daily' THEN 1 ELSE 0 END) AS daily_count, c.category, c.id AS id_person FROM scheduling s INNER JOIN people p ON p.id = s.person_id INNER JOIN categories c ON c.id = p.category_id WHERE s.date_filter >= '2023-07-01' AND s.date_filter <= '2023-07-31' GROUP BY s.person_id, s.start_date, s.modification",
    [start, end]
  );
  return rows as Array<IReport>;
}

export async function getReportCount(
  start: IScheduleData["start_date"],
  end: IScheduleData["end_date"]
): Promise<Array<ICount> | null> {
  const conn = connect();
  if (!conn) return null;
  const [rows] = await conn.query<Array<RowDataPacket>>(
    "SELECT c.category, COUNT(s.person_id) AS counts FROM scheduling s INNER JOIN people p ON p.id = s.person_id INNER JOIN categories c ON c.id = p.category_id WHERE s.date_filter >= ? AND s.date_filter <= ? GROUP BY p.category_id, c.category ORDER BY counts DESC LIMIT 10",
    [start, end]
  );
  return rows as Array<ICount>;
}

export async function getReportCounts(): Promise<Array<ICount> | null> {
  const conn = connect();
  if (!conn) return null;
  const [rows] = await conn.query<Array<RowDataPacket>>(
    "SELECT c.category, COUNT(s.person_id) AS counts FROM scheduling s INNER JOIN people p ON p.id = s.person_id INNER JOIN categories c ON c.id = p.category_id GROUP BY p.category_id, c.category ORDER BY counts DESC LIMIT 10"
  );
  return rows as Array<ICount>;
}
