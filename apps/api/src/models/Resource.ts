import { IDocument } from "interfaces/IDocument";
import { IFaculty } from "interfaces/IFaculty";
import { RowDataPacket } from "mysql2";
import { connect } from "../db";
import { ICategory } from "../interfaces/ICategory";

export async function getCategories(): Promise<Array<ICategory> | null> {
    const conn = connect();
    if (!conn) return null;
    const [rows] = await conn.query<Array<RowDataPacket>>(
        "SELECT id, category FROM categories"
    );
    return rows as Array<ICategory>;
}

export async function getDocuments(): Promise<Array<IDocument> | null> {
    const conn = connect();
    if (!conn) return null;
    const [rows] = await conn.query<Array<RowDataPacket>>(
        "SELECT id, description FROM documents"
    );
    return rows as Array<IDocument>;
}

export async function getFaculties(): Promise<Array<IFaculty> | null> {
    const conn = connect();
    if (!conn) return null;
    const [rows] = await conn.query<Array<RowDataPacket>>(
        "SELECT id, facultie FROM faculties"
    );
    return rows as Array<IFaculty>;
}
